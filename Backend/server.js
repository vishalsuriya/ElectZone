const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const connectDB = require("../Backend/Database/connection");
const Cards = require("../Backend/model/CardModel");

// Use body-parser middleware to parse incoming request bodies
app.use(express.json());

connectDB();

app.get("/", async (req, res) => {
  try {
    const Card = await Cards.find();
    console.log(Card);
    res.send(Card);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
