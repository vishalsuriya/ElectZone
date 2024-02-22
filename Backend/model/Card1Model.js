const mongoose = require("mongoose");

var card1Schema = new mongoose.Schema({
  id: {
    type: String,
  },
  imgsrc: {
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

const Card1 = mongoose.model("Card1", card1Schema);

module.exports = Card1;
