const mongoose = require("mongoose");

var card3Schema = new mongoose.Schema({
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

const Card3 = mongoose.model("Card3", card3Schema);

module.exports = Card3;
