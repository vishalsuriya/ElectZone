const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const connectDB = require("../Backend/Database/connection");
const Cards = require("../Backend/model/CardModel");

// Use body-parser middleware to parse incoming request bodies
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Allow specific HTTP methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allow specific headers
  next();
});
connectDB();

app.get("/", async (req, res) => {
  try {
    const Card = await Cards.find();
    // console.log(Card);
    res.send(Card);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
