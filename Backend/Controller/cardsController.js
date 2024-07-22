const asyncHandler = require("express-async-handler");
const Cards = require("../model/CardModel");
const Card1 = require("../model/Card1Model");
const Card2 = require("../model/Card2Model");
const Card3 = require("../model/Card3Model");
const Card4 = require("../model/Card4Model");
const Card5 = require("../model/Card5Model");

const card = asyncHandler(async (req, res) => {
  try {
    const cards = await Cards.find();
    res.json(cards);
  } catch (error) {
    handleError(res, error, "Failed to fetch cards");
  }
});

const CircleCard1 = asyncHandler(async (req, res) => {
  try {
    const cards = await Card1.find();
    res.json(cards);
  } catch (error) {
    handleError(res, error, "Failed to fetch CircleCard1");
  }
});

const CircleCard2 = asyncHandler(async (req, res) => {
  try {
    const cards = await Card2.find();
    res.json(cards);
  } catch (error) {
    handleError(res, error, "Failed to fetch CircleCard2");
  }
});

const CircleCard3 = asyncHandler(async (req, res) => {
  try {
    const cards = await Card3.find();
    res.json(cards);
  } catch (error) {
    handleError(res, error, "Failed to fetch CircleCard3");
  }
});

const CircleCard4 = asyncHandler(async (req, res) => {
  try {
    const cards = await Card4.find();
    res.json(cards);
  } catch (error) {
    handleError(res, error, "Failed to fetch CircleCard4");
  }
});

const CircleCard5 = asyncHandler(async (req, res) => {
  try {
    const cards = await Card5.find();
    res.json(cards);
  } catch (error) {
    handleError(res, error, "Failed to fetch CircleCard5");
  }
});

const allCards = asyncHandler(async (req, res) => {
  const searchQuery = req.query.q ? req.query.q.toLowerCase() : "";

  try {
    // Fetch data from all collections and ensure data is plain JavaScript objects
    const [homecards, cards1Data, cards2Data, cards3Data, cards4Data, cards5Data] = await Promise.all([
      Cards.find().lean(),
      Card1.find().lean(),
      Card2.find().lean(),
      Card3.find().lean(),
      Card4.find().lean(),
      Card5.find().lean()
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

module.exports = {
  card,
  CircleCard1,
  CircleCard2,
  CircleCard3,
  CircleCard4,
  CircleCard5,
  allCards
};
