// Required dependencies
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const cors = require("cors");
const asyncHandler = require("express-async-handler");
const Users = require("./model/UserModel.js");
const connectDB = require("./Database/connection");
const userRoutes = require("./routes/userRoutes.js");
const cardsRoutes = require("./routes/cardsRoutes.js");
const { notFound, errorHandler } = require("./middleware/ErrorMiddleware.js");

// Load environment variables
dotenv.config();
const app = express();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Enable CORS
app.use(
  cors({
    origin: "https://elect-zone-ecommerce.vercel.app",
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true,
  })
);

// Connect to database
connectDB();



// Stripe Webhook
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  asyncHandler(async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error(`❌ Webhook Error: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      await handleCheckoutSessionCompleted(event.data.object);
    }

    res.json({ received: true });
  })
);

const handleCheckoutSessionCompleted = async (session) => {
  try {
    const userEmail = session.customer_email;
    const products = JSON.parse(session.metadata.products || "[]");
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
    const user = await Users.findOne({ email: userEmail });

    if (user) {
      user.userOrders.push({
        orderId: session.id,
        products: products.map((product, index) => ({
          productId: product.productId,
          productName: lineItems.data[index]?.description || "Unknown Product",
          price:(lineItems.data[index]?.amount_total || 0) / 100,
          quantity: lineItems.data[index]?.quantity || 1,
          imgsrc: Array.isArray(product.imgsrc) ? product.imgsrc[0] : product.imgsrc
        })),
      });

      await user.save();

    }

    await sendConfirmationEmail(userEmail, session, lineItems.data, user?.name || "Customer");
  } catch (error) {
    console.error("🚨 Error handling checkout session:", error);
  }
};


const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Sending order confirmation email
const sendConfirmationEmail = async (userEmail, session, data, userName) => {
  const products = JSON.parse(session.metadata.products || "[]");

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "Order Confirmation",
    html: `
      <p>Thank you for your purchase, <strong>${userName}</strong>!</p>
      <p>Your Order ID is <strong>${session.id}</strong>.</p>
      <h3>Order Summary:</h3>
      <ul>
        ${data
          .map(
            (p, index) => `
              <li>
                <img src="${products[index]?.imgsrc || ''}" alt="${p.productName || 'Product'}" style="width:100px; height:auto; border-radius: 5px;">
                <br>
                <strong>${p.description || p.productName}</strong> (x${p.quantity || 1}): ₹${((p.amount_total || p.price) / 100).toFixed(2)}
              </li>
              <br>
            `
          )
          .join("")}
      </ul>
      <p>We appreciate your business and hope you enjoy your purchase!</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("📧 Order confirmation email sent successfully!");
  } catch (error) {
    console.error("🚨 Error sending email:", error);
  }
};

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Routes
app.use("/api/users", userRoutes);
app.use("/api/cards", cardsRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
