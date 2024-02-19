const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("../Backend/Database/connection");
const Cards = require("../Backend/model/CardModel");
const Userlogins = require("../Backend/model/LoginModel");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
connectDB();

// app.get("/", async (req, res) => {
//   try {
//     const Card = await Cards.find();
//     // console.log(Card);
//     // res.send(Card);
//   } catch (error) {
//     console.error("Error retrieving data:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });


const PORT = process.env.PORT || 8000;
app.listen(8000, () => {
  console.log(`Server is running on port ${PORT}`);
});
