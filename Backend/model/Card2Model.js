const mongoose = require("mongoose");

var card2Schema = new mongoose.Schema({
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

const Card2 = mongoose.model("Card2", card2Schema);

module.exports = Card2;
