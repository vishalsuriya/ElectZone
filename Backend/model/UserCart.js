const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  items :[{
    _id: {
      type :String,
      required: true
    },
    id :{
      type :String,
    },
    title: {
      type: String,
      
    },
    price: {
      type: String,
    
    },
    quantity: {
      type: String,
      
    },
    imgsrc: {
      type: String
    },
    content :{
      type :String
    },
    itemTotal : {
      type : String
    }
  }
  ]

});

const UserCart = mongoose.model('UserCart', CartSchema);
module.exports = UserCart;
