const asyncHandler = require("express-async-handler");
const Cards = require("../model/CardModel");
const Card1 = require("../model/Card1Model");
const Card2 = require("../model/Card2Model");
const Card3 = require("../model/Card3Model");
const Card4 = require("../model/Card4Model");
const Card5 = require("../model/Card5Model");
const Users = require("../model/UserModel")
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
const addToCart = asyncHandler(async (req, res) => {
  const { product, email } = req.body;
  const quantity  = 1;
  if (!product ||  !email) {
    return res.status(400).json({ message: "Product details and email are required" });
  }
  const user = await Users.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const productId = product._id;
  const existingCartItem = user.userCart.find((item) => item.productId.equals(productId));

  if (existingCartItem) {
    existingCartItem.quantity += quantity;
  } else {
    user.userCart.push({
      productId, 
      productName: product.title,
      price: parseFloat(product.price), 
      quantity,
      imgsrc: product.imgsrc,
      content: product.content, 
    });
  }
  await user.save();
  res.status(200).json({ message: "Product added to cart", cart: user.userCart });
});

const allCards = asyncHandler(async (req, res) => {
  const searchQuery = req.query.q ? req.query.q.toLowerCase() : "";

  try {
    const [homecards, cards1Data, cards2Data, cards3Data, cards4Data, cards5Data] = await Promise.all([
      Cards.find().lean(),
      Card1.find().lean(),
      Card2.find().lean(),
      Card3.find().lean(),
      Card4.find().lean(),
      Card5.find().lean()
    ]);
    const normalizeCard = (card) => ({
      id: card._id,
      title: card.title || "No Title",
      imgsrc:card.imgsrc || "No Image",
      content:card.content,
      price: card.price
    });

    let allCards = [
      ...homecards.map(normalizeCard),
      ...cards1Data.map(normalizeCard),
      ...cards2Data.map(normalizeCard),
      ...cards3Data.map(normalizeCard),
      ...cards4Data.map(normalizeCard),
      ...cards5Data.map(normalizeCard)
    ];
    const seenTitles = new Set();
    allCards = allCards.filter(card => {
      if (seenTitles.has(card.title)) {
        return false;
      } else {
        seenTitles.add(card.title);
        return true;
      }
    });
    if (searchQuery) {
      allCards = allCards.filter(card =>
        card.title.toLowerCase().includes(searchQuery)
      );
    }
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
  allCards,
  addToCart
};
