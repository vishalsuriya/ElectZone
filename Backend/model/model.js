const { default: mongoose } = require("mongoose");
const moongoose = require("mongoose");

var loginSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  Password: {
    type: String,
  },
});

var registerSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  Password: {
    type: String,
  },
  RePassword: {
    type: String,
  },
});

var cardSchema = new mongoose.Schema({
  cardname: {
    type: String,
  },
  cardQuantity: {
    type: String,
  },
  carddetails: {
    type: String,
  },
});

const Login = mongoose.model("Login", loginSchema);
const Register = mongoose.model("Register", registerSchema);
const Card = mongoose.model("Card", cardSchema);

module.exports = { Login, Register, Card };
