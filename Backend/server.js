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
      console.log("✅ Webhook Received:", event.id);
    } catch (err) {
      console.error(`❌ Webhook Error: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      console.log(`✅ Checkout session completed: ${event.data.object.id}`);
      await handleCheckoutSessionCompleted(event.data.object);
    }

    res.json({ received: true });
  })
);

// Handle successful checkout session
const handleCheckoutSessionCompleted = async (session) => {
  try {
    const userEmail = session.customer_email;
    console.log("User Email:", userEmail);
    console.log(session);
    // Print metadata
    console.log("Metadata:", session.metadata);

    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
    console.log("Line Items:", lineItems.data);

    const user = await Users.findOne({ email: userEmail });

    if (user) {
      user.userOrders.push({
        orderId: session.id,
        products: lineItems.data.map((item) => ({
          productId: session.metadata.products.productId,
          productName: item.description,
          price: item.amount_total,
          quantity: item.quantity || 1,
          imgsrc: session.metadata.products.imgsrc
        })),
      });
      await user.save();
      console.log("🛍️ Order saved for user:", userEmail);
    }

    await sendConfirmationEmail(userEmail, session, lineItems.data, user?.name || "Customer");
  } catch (error) {
    console.error("🚨 Error handling checkout session:", error);
  }
};

// Nodemailer setup
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

// Send order confirmation email
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
                <strong>${p.description || p.productName}</strong> (x${p.quantity || 1}): $${(p.amount_total || p.price) / 100}
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
