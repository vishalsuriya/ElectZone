const mongoose = require("mongoose");

var cardSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  imgsrc: {
    data: Buffer,
    type: String,
  },
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  price: {
    type: String,
  },
});

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
