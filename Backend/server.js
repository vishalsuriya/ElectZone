const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const connectDB = require("../Backend/Database/connection");
const Cards = require("../Backend/model/CardModel");

// Use body-parser middleware to parse incoming request bodies

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
