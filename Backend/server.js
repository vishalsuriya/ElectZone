// Required dependencies
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const asyncHandler = require("express-async-handler");
const nodeMailer = require("nodemailer");
const Users = require("./model/UserModel.js");
const connectDB = require("./Database/connection");

// Load environment variables
dotenv.config();
const app = express();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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

// Stripe Webhook: Only Handling checkout.session.completed
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  asyncHandler(async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
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

// Function to handle successful checkout session
const handleCheckoutSessionCompleted = async (session) => {
  try {
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
      console.log("🛍️ Order saved for user:", userEmail);
    }

    await sendConfirmationEmail(userEmail, session, lineItems.data, user?.name || "Customer");
  } catch (error) {
    console.error("🚨 Error handling checkout session:", error);
  }
};

// Nodemailer Email Configuration
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

// Function to send order confirmation email
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

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
