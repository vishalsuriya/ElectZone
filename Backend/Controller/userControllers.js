const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const Users = require("../model/UserModel.js");
const mongoose = require("mongoose");
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const  generateToken  = require( "../utils/generateToken.js");
const registerUser = asyncHandler(async(req,res)=>{
    const {name,email,password,pic} = req.body;
    const userExists = await Users.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error("User Already Exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
   const user = await Users.create({
     name,
     email,
     password : hashedPassword,
     pic,
   });
   if(user){
    res.status(201).json({
      data :{
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin :user.isAdmin,
        pic:user.pic,
        token: generateToken(user._id),
      },
    })
   }else{
     res.status(400)
     throw new Error ("Error Occured");
   }
   
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide both email and password");
  }
  const user = await Users.findOne({ email });
  if (!user) {
    return res.status(401).json({ status: "error", message: "Invalid credentials" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  
  if (!isMatch) {
    return res.status(401).json({ status: "error", message: "Invalid credentials" });
  }
  if(isMatch){
  res.status(200).json({
    status: "success",
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    },
  });
}
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await Users.findById(req.params.id); 
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt); 
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      pic: updatedUser.pic,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id), 
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

const getUser = asyncHandler(async (req, res) => {
  try {
    const user = await Users.findById(req.params.id); 
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        cart: user.userCart, 
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

const clearUserCart = asyncHandler(async(req,res)=>{
  const user = await Users.findById(req.params.id);
  try{
    if(user){
    user.userCart = [];
    await user.save();
    res.json({message: "cart cleared sucessfully"});
    }else{
      res.status(404).json({message : "user not found"})
    }
  }catch(error){
    res.status(500).json({message : "Error clearing cart",error})
  }
});

const removeUserItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const updatedUser = await Users.findByIdAndUpdate(
      userId,
      { $pull: { userCart: { productId } } },
      { new: true } 
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Item not found in cart" });
    }
    res.json({
      message: "Item removed successfully",
      cart: updatedUser.userCart,
    });
  } catch (error) {
    console.error("Error removing item:", error);
    res.status(500).json({ message: "An error occurred while removing the item" });
  }
};


const increaseQuantity = async (req, res) => {
  const { userId, productId } = req.params;
  try {
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    let productObjId;
    try {
      productObjId = new mongoose.Types.ObjectId(productId);
    } catch (error) {
      return res.status(400).json({ message: "Invalid productId" });
    }
    const productIndex = user.userCart.findIndex(item => item.productId.toString() === productObjId.toString());
    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }
    user.userCart[productIndex].quantity += 1;
    await user.save();
    return res.status(200).json({
      message: "Quantity increased successfully",
      cart: user.userCart
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
const decreaseQuantity = async (req, res) => {
  const { userId, productId } = req.params;
  try {
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    let productObjId;
    try {
      productObjId = new mongoose.Types.ObjectId(productId);
    } catch (error) {
      return res.status(400).json({ message: "Invalid productId" });
    }
    const productIndex = user.userCart.findIndex(item => item.productId.toString() === productObjId.toString());
    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }
    user.userCart[productIndex].quantity -= 1;
    await user.save();
    return res.status(200).json({
      message: "Quantity decreased successfully",
      cart: user.userCart
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
 
const userPayment = asyncHandler(async (req, res) => {
  try {
      const { products, userEmail, userName } = req.body;

      if (!products || !userEmail) {
          return res.status(400).json({ error: 'Missing required fields' });
      }
      const productMetadata = products.map((product) => ({
          productId: product.productId || product._id,
          imgsrc : product.imgsrc ? [product.imgsrc] : [],
      }));

      const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: products.map((product) => ({
              price_data: {
                  currency: 'usd',
                  product_data: {
                      name: product.title || product.productName,
                      images: product.imgsrc ? [product.imgsrc] : [],
                  },
                  unit_amount: Math.round(product.price * 100),
              },
              quantity: product.quantity || 1,
          })),
          customer_email: userEmail,
          mode: 'payment',
          success_url: `https://elect-zone-ecommerce.vercel.app/PaymentSucess`,
          metadata: {
              products: JSON.stringify(productMetadata), 
          },
      });

      res.status(200).json({ sessionId: session.id });

  } catch (error) {
      console.error('Error creating Stripe session:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});



  module.exports = { registerUser, loginUser, updateUserProfile, userPayment,getUser
    ,clearUserCart,removeUserItem,increaseQuantity,decreaseQuantity
  };