const mongoose = require("mongoose");

var card4Schema = new mongoose.Schema({
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

const Card4 = mongoose.model("Card4", card4Schema);

module.exports = Card4;
