// Required dependencies
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const nodeMailer = require("nodemailer");
const cors = require("cors");
const asyncHandler = require("express-async-handler");
const Users = require("./model/UserModel.js")
const connectDB = require("./Database/connection");
const userRoutes = require("./routes/userRoutes.js");
const cardsRoutes = require("./routes/cardsRoutes.js");
const { notFound, errorHandler } = require("./middleware/ErrorMiddleware.js");

dotenv.config();
const app = express();
const stripe = require('stripe')(process.env.STRIPE_WEBHOOK_SECRET);


// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "https://elect-zone-ecommerce.vercel.app",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

// Database connection
connectDB();

// Stripe Webhook 
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  asyncHandler(async (req, res) => {
    let event;
    try {
      const sig = req.headers["stripe-signature"];
      event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      console.error("Webhook Error:", err.message);
      return res.status(400).json({ error: `Webhook error: ${err.message}` });
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const userEmail = session.customer_email;
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

      const user = await Users.findOne({ email: userEmail });
      if (user) {
        user.userOrders.push({
          orderId: session.id,
          products: lineItems.data.map((item) => ({
            productName: item.description,
            price: item.amount_total / 100,
            quantity: item.quantity,
          })),
        });
        await user.save();
      }

      await sendConfirmationEmail(userEmail, session, lineItems.data, user?.name || "Customer");
    }

    res.status(200).json({ received: true });
  })
);

// Nodemailer Transporter
const transporter = nodeMailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send Confirmation Email
const sendConfirmationEmail = async (userEmail, session, products, userName) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "Order Confirmation",
    html: `
      <p>Thank you for your purchase, <strong>${userName}</strong>!</p>
      <p>Your Order ID is <strong>${session.id}</strong>.</p>
      <h3>Order Summary:</h3>
      <ul>
        ${products
          .map(
            (p) => `
              <li>
                <strong>${p.title || p.productName}</strong> (x${p.quantity || 1}): $${p.price}
                <br />
                <img src="${p.imgsrc}" alt="${p.title || p.productName}" style="max-width:100px; margin-top:5px;" />
              </li>
            `
          )
          .join("")}
      </ul>
      <p>We appreciate your business and hope you enjoy your purchase!</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Routes
app.use("/api/users", userRoutes);
app.use("/api/cards", cardsRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
