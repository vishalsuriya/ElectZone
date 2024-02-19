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

app.get("/", async (req, res) => {
  try {
    const userLogins = await Userlogins.find({}); // Provide criteria to filter if needed
    console.log(userLogins);
    res.send(userLogins);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/UserLogin", async (req, res) => {
  const { email, password } = req.body;
  const lowercaseEmail = email.toLowerCase(); 
  try {
    const user = await Userlogins.findOne({ email: lowercaseEmail }, 'password');
    if (user && user.password === password) {
      res.json({ status: "success", message: "exists" });
    } else {
      res.json({ status: "failure", message: "notexists" });
    }
  } catch (error) {
    console.error("Error during UserLogin:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

app.post('/user/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await Userlogins.findOne({ email });

    if (existingUser) {
      return res.json({ status: 'exists', message: 'User already exists' });
    }

    const newUser = new User({
      name,
      email,
      password, // Note: In a production environment, consider hashing the password.
    });

    await newUser.save();

    res.json({ status: 'success', message: 'User registered successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ status: 'error', message: 'Something went wrong' });
  }
});
const PORT = process.env.PORT || 8000;
app.listen(8000, () => {
  console.log(`Server is running on port ${PORT}`);
});
