// Required dependencies
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("../Backend/Database/connection");
const userRoutes = require("./routes/userRoutes.js");
const cardsRoutes = require("./routes/cardsRoutes.js");
const { notFound, errorHandler } = require("../Backend/middleware/ErrorMiddleware.js");
// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: 'https://elect-zone-ecommerce.vercel.app', 
  methods: ['GET', 'POST','DELETE','PUT'], 
  credentials: true, 
}));


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
