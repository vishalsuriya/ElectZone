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
      res.json( cards );
  } catch (error) {
      console.error("Error retrieving cards:", error);
      res.status(500).json({ error: "Internal Server Error: Failed to fetch cards" });
  }
});
const CircleCard1 = asyncHandler(async (req, res) => {
  try {
      const cards = await Card1.find();
      res.json( cards );
  } catch (error) {
      console.error("Error retrieving cards:", error);
      res.status(500).json({ error: "Internal Server Error: Failed to fetch cards" });
  }
});
const CircleCard2 = asyncHandler(async (req, res) => {
  try {
      const cards = await Card2.find();
      res.json( cards );
  } catch (error) {
      console.error("Error retrieving cards:", error);
      res.status(500).json({ error: "Internal Server Error: Failed to fetch cards" });
  }
});
const CircleCard3 = asyncHandler(async (req, res) => {
  try {
      const cards = await Card3.find();
      res.json( cards );
  } catch (error) {
      console.error("Error retrieving cards:", error);
      res.status(500).json({ error: "Internal Server Error: Failed to fetch cards" });
  }
});
const CircleCard4 = asyncHandler(async (req, res) => {
  try {
      const cards = await Card4.find();
      res.json( cards );
  } catch (error) {
      console.error("Error retrieving cards:", error);
      res.status(500).json({ error: "Internal Server Error: Failed to fetch cards" });
  }
});
const CircleCard5 = asyncHandler(async (req, res) => {
  try {
      const cards = await Card5.find();
      res.json( cards );
  } catch (error) {
      console.error("Error retrieving cards:", error);
      res.status(500).json({ error: "Internal Server Error: Failed to fetch cards" });
  }
});
module.exports = {card,CircleCard1,CircleCard2,CircleCard3,CircleCard4,CircleCard5};