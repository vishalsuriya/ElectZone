const asyncHandler = require("express-async-handler");
const Users = require("../model/UserModel.js");
const UserCart = require("../model/UserCart.js");
const  generateToken  = require( "../utils/generateToken.js");
const stripe = require("stripe")("sk_test_51Pez84Glv44VgkWUlFo88RHr7mzu3JCJPNTdbJwIBg5DSC8eEF8TaRrd1dXsYU47fzJkaJvLqClBoX0KBcMZH9xg00qzHVkawL");
const registerUser = asyncHandler(async(req,res)=>{
    const {name,email,password,pic} = req.body;
    const userExists = await Users.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error("User Already Exists");
    }
   const user = await Users.create({
     name,
     email,
     password,
     pic,
   });
   if(user){
    res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin :user.isAdmin,
        pic:user.pic,
        token: generateToken(user._id),
    })
   }else{
     res.status(400)
     throw new Error ("Error Occured");
   }
   
});

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const user = await Users.findOne({ email });
  
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  });
  const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await Users.findById(req.user._id);
  
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.pic = req.body.pic || user.pic;
      if (req.body.password) {
        user.password = req.body.password;
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
  const usercart = asyncHandler(async (req, res) => {
    try {
      const cartData = req.body;
      await UserCart.findOneAndUpdate(
        { userName: cartData.userName }, 
        cartData,
        { upsert: true } 
      );
      res.status(200).json({ message: 'Cart data received and saved successfully!' });
    } catch (err) {
      res.status(500).json({ message: 'Error saving cart data', error: err });
    }
  });
  const userPayment = asyncHandler(async (req, res) => {
    try {
      const paymentData = req.body.products; // Ensure you're using the correct property
  
      // Log the incoming payment data to debug
      console.log('Payment Data:', paymentData);
  
      const lineItems = paymentData.map((data, index) => {
        // Log each data item to ensure correct structure
        console.log(`Item ${index}:`, data);
  
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: data.title,
              images: [data.imgsrc],
            },
            unit_amount: Math.round(data.price * 100), // Amount in cents
          },
          quantity: data.quantity || 1, // Ensure the quantity field is present, defaulting to 1 if not provided
        };
      });
  
      // Log the constructed lineItems array
      console.log('Line Items:', lineItems);
  
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: 'http://localhost:3000/success', // Update with your success URL
        cancel_url: 'http://localhost:3000/cancel',   // Update with your cancel URL
      });
  
      res.json({ id: session.id });
    } catch (error) {
      console.error('Error creating Stripe session:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  });
  
  module.exports = { registerUser, authUser, updateUserProfile, usercart, userPayment };