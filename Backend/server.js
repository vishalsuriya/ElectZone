// Required dependencies
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");

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

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
