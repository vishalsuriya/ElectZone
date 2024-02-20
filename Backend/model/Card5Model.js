const mongoose = require("mongoose");

var card5Schema = new mongoose.Schema({
  id: {
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

const Card5 = mongoose.model("Card5", card5Schema);

module.exports = Card5;
