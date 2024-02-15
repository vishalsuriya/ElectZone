const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const connectDB = require("../Backend/Database/connection");

connectDB();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
