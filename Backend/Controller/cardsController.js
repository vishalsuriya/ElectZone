const asyncHandler = require("express-async-handler");
const Cards = require("../model/CardModel");
const card = asyncHandler(async (req, res) => {
  try {
      const cards = await Cards.find();
      res.json({ cards });
  } catch (error) {
      console.error("Error retrieving cards:", error);
      res.status(500).json({ error: "Internal Server Error: Failed to fetch cards" });
  }
});
module.exports = card;