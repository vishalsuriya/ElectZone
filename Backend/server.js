const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();
const multer = require('multer');
const path = require('path');
const bcrypt = require("bcrypt");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json({ limit: '5mb' }));
const connectDB = require("../Backend/Database/connection");
const Cards = require("../Backend/model/CardModel");
const Cards1 = require("../Backend/model/Card1Model");
const Cards2 = require("../Backend/model/Card2Model");
const Cards3 = require("../Backend/model/Card3Model");
const Cards4 = require("../Backend/model/Card4Model");
const Cards5 = require("../Backend/model/Card5Model");
const UserData = require("../Backend/model/UserDetailsModel");
connectDB();
//home card
// app.get("/", async (req, res) => {
//   try {
//     const Card = await Cards.find();
//     res.send(Card);
//   } catch (error) {
//     console.error("Error retrieving data:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });
// //circlecard1
// app.get("/cards1", async (req, res) => {
//   try {
//     const Card = await Cards1.find();
//     res.send(Card);
//   } catch (error) {
//     console.error("Error retrieving data:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });
// //circlecard2
// app.get("/cards2", async (req, res) => {
//   try {
//     const Card = await Cards2.find();
//     res.send(Card);
//   } catch (error) {
//     console.error("Error retrieving data:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });
// //circlecard3
// app.get("/cards3", async (req, res) => {
//   try {
//     const Card = await Cards3.find();
//     res.send(Card);
//   } catch (error) {
//     console.error("Error retrieving data:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });
// //circlecard4
// app.get("/cards4", async (req, res) => {
//   try {
//     const Card = await Cards4.find();
//     res.send(Card);
//   } catch (error) {
//     console.error("Error retrieving data:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });
// //circlecard5
// app.get("/cards5", async (req, res) => {
//   try {
//     const Card = await Cards5.find();
//     res.send(Card);
//   } catch (error) {
//     console.error("Error retrieving data:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });


// // user login
   app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    console.log("Received credentials:", email, password);
  
    try {
      const user = await UserData.findOne({ email: email });
      console.log(user);
      if (user) {
        const match = await bcrypt.compare(password, user.password); 
        if (match) {
          res.json({ status: "success", message: "exists" });
        } else {
          res.json("Invalid credentials. Please try again.");
        }
      } else {
        res.json("No record exists");
      }
    } catch (err) {
      console.error("Error during authentication:", err);
      res.status(500).json("Internal server error");
    }
  });
  
// user registeration

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      UserData.create({
        name,
        email,
        password: hash,
        phoneNumber: null,
        address: null,
        image: null,
      })
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json({ error: err.message }));
    })
    .catch((err) => res.status(500).json({ error: "Internal Server Error" }));
});



app.get("/data", async (req, res) => {
  const { email } = req.query;
  try {
    const user = await UserData.findOne({ email: email });
    console.log("User Profile Data:", user); // Add this line to log user data

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    console.error("Error fetching user profile:", err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
app.post('/profile', async (req, res) => {
  try {
    const { email, phoneNumber, address, image } = req.body;
    console.log('Received data:', req.body);
    const user = await UserData.findOneAndUpdate(
      { email: email },
      {
        $set: {
          phoneNumber,
          address,
          image,
        },
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Profile updated successfully');
    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(8000, () => {
  console.log(`Server is running on port ${PORT}`);
});
