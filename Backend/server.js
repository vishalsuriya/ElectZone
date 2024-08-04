// Required dependencies
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const nodeMailer = require("nodemailer");
// Custom modules
const connectDB = require("../Backend/Database/connection");
const userRoutes = require("./routes/userRoutes.js");
const cardsRoutes = require("../Backend/routes/CardsRoutes.js");
const { notFound, errorHandler } = require("../Backend/middleware/ErrorMiddleware.js");

// Models (not used in this file, consider removing if unnecessary)
const cards = require("./model/CardModel.js");
const card1 = require("./model/Card1Model.js");
const card2 = require("./model/Card2Model.js");
const card3 = require("./model/Card3Model.js");
const card4 = require("./model/Card4Model.js");
const card5 = require("./model/Card5Model.js");
const UserCart = require("./model/UserCart.js");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Database connection
connectDB();

// Routes
app.use("/api/users", userRoutes);
app.use("/api/cards", cardsRoutes);
const endpointSecret = 'whsec_34db7d1d6ff5a27466284dd6e1d0df66e2bfabdad238a14807852f8f6bc2847f'; // Replace with your Stripe webhook secret

// Webhook endpoint for handling Stripe events
const transporter = nodeMailer.createTransport({
  service: 'gmail', // You can use other services like 'sendgrid', 'mailgun', etc.
  auth: {
    user: 'vishalsuriya2003@gmail.com', // Replace with your email address
    pass: 'xznl manu vwwt zvbf'    // Replace with your email password or an app-specific password
  }
});

app.use(bodyParser.raw({ type: 'application/json' }));

app.post('/Electzone/api/stripe/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    console.log('Checkout session completed:', session);
    const userEmail = session.customer_email;
    // Send confirmation email
    await sendConfirmationEmail(session);
  }

  res.json({ received: true });
});

const sendConfirmationEmail = async (userEmail ,session) => {
  const mailOptions = {
    from: 'vishalsuriya2003@gmail.com', // Replace with your email address
    to : userEmail,   // Replace with the customer's email address
    subject: 'Order Confirmation',
    text: `Thank you for your purchase! Your session ID is ${session.id}.`,
    html: `<p>Thank you for your purchase! Your session ID is <strong>${session.id}</strong>.</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
