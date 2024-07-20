const bodyParser = require("body-parser");
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("../Backend/Database/connection");
const userRoutes = require("./routes/userRoutes.js");
const {
  notFound,
  errorHandler,
} = require("../Backend/middleware/ErrorMiddleware.js");
const cardsRoutes = require("../Backend/routes/CardsRoutes.js");

const cards = require("./model/CardModel.js");
const card1 = require("./model/Card1Model.js");
const card2 = require("./model/Card2Model.js");
const card3 = require("./model/Card3Model.js");
const card4 = require("./model/Card4Model.js");
const card5 = require("./model/Card5Model.js");

const cors = require("cors");
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
connectDB();

app.use("/api/users", userRoutes);
app.use("/api/cards", cardsRoutes);

app.get("/api/allcards", async (req, res) => {
  const searchQuery = req.query.q ? req.query.q.toLowerCase() : "";

  try {
    // Fetch data from all collections and ensure data is plain JavaScript objects
    const [homecards, cards1Data, cards2Data, cards3Data, cards4Data, cards5Data] = await Promise.all([
      cards.find().lean(),
      card1.find().lean(),
      card2.find().lean(),
      card3.find().lean(),
      card4.find().lean(),
      card5.find().lean()
    ]);

    // Normalize and combine all cards into one flat array
    const normalizeCard = (card) => ({
      id: card._id,
      title: card.title || "No Title",
      imgsrc:card.imgsrc || "No Image",
      content:card.content,
      price: card.price

      // Add other properties you need to normalize
    });

    let allCards = [
      ...homecards.map(normalizeCard),
      ...cards1Data.map(normalizeCard),
      ...cards2Data.map(normalizeCard),
      ...cards3Data.map(normalizeCard),
      ...cards4Data.map(normalizeCard),
      ...cards5Data.map(normalizeCard)
    ];

    // Use a Set to keep track of unique titles
    const seenTitles = new Set();
    allCards = allCards.filter(card => {
      if (seenTitles.has(card.title)) {
        return false;
      } else {
        seenTitles.add(card.title);
        return true;
      }
    });

    // Filter cards based on search query
    if (searchQuery) {
      allCards = allCards.filter(card =>
        card.title.toLowerCase().includes(searchQuery)
      );
    }

    // Send the combined array of all cards as JSON response
    res.status(200).json(allCards);
  } catch (err) {
    console.error('Error fetching cards:', err);
    res.status(500).json({ msg: 'Internal Server Error', error: err.message });
  }
});






app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
