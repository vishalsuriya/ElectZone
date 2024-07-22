const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  imgsrc: {
    type: String
  }
});

const CartSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  items: [CartItemSchema]
});

const UserCart = mongoose.model('UserCart', CartSchema);
module.exports = UserCart;
