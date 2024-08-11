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



// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
