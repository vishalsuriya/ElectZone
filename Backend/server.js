// Required dependencies
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51Pez84Glv44VgkWUlFo88RHr7mzu3JCJPNTdbJwIBg5DSC8eEF8TaRrd1dXsYU47fzJkaJvLqClBoX0KBcMZH9xg00qzHVkawL");
// Custom modules
const connectDB = require("../Backend/Database/connection");
const userRoutes = require("./routes/userRoutes.js");
const cardsRoutes = require("./routes/cardsRoutes.js");
const { notFound, errorHandler } = require("../Backend/middleware/ErrorMiddleware.js");

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

const endpointSecret = "whsec_yBK3s5jrCH7OTLQ7WFx046khqPn5mzV1";

app.post('/webhook', express.raw({type: 'application/json'}), async (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const checkoutSessionCompleted = event.data.object;
      const userEmail = checkoutSessionCompleted.customer_email; // Adjust this based on your payload

      // Ensure `userEmail` and `checkoutSessionCompleted.id` are available
      if (userEmail && checkoutSessionCompleted.id) {
        await sendConfirmationEmail(userEmail, checkoutSessionCompleted);
        response.status(200).send('Event handled and email sent');
      } else {
        response.status(400).send('Required data missing');
      }
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});
const sendConfirmationEmail = async (userEmail, session) => {
  const mailOptions = {
    from: "vishalsuriya2003@gmail.com",
    to: userEmail,
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
