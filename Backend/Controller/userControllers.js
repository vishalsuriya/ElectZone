const asyncHandler = require("express-async-handler");
const Users = require("../model/UserModel.js");
const nodeMailer = require("nodemailer");
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
  
  const orderStore = {}; // In-memory store for demonstration

  const userPayment = asyncHandler(async (req, res) => {
    try {
      const { products, userEmail } = req.body;
      if (!products || !userEmail) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
  
      console.log('Payment Data:', products);
      console.log('User Email:', userEmail);
  
      // Prepare line items for Stripe checkout session
      const lineItems = products.map((data) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: data.title,
            images: [data.imgsrc],
          },
          unit_amount: Math.round(data.price * 100), // Amount in cents
        },
        quantity: data.quantity || 1, // Default to 1 if quantity is not provided
      }));
  
      // Create a Stripe checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        customer_email: userEmail,
        mode: 'payment',
        success_url: `http://localhost:3000/Orders?session_id={CHECKOUT_SESSION_ID}`
      });
  
      // Store the session details
      orderStore[session.id] = {
        products,
        userEmail,
        sessionId: session.id,
        date: new Date(),
      };
  
      // Create transporter for sending emails
      const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
  
      // Function to send confirmation email
      const sendConfirmationEmail = async (userEmail, session) => {
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: userEmail,
          subject: 'Order Confirmation',
          text: `Thank you for your purchase! Your session ID is ${session.id}.`,
          html: `<p>Thank you for your purchase! Your session ID is <strong>${session.id}</strong>.</p>`,
        };
  
        try {
          await transporter.sendMail(mailOptions);
          console.log('Email sent successfully');
        } catch (error) {
          console.error('Error sending email:', error);
        }
      };
  
      // Send confirmation email
      await sendConfirmationEmail(userEmail, session);
  
      // Respond with the session ID
      if (session.id) {
        res.status(200).json({ id: session.id, session });
      } else {
        res.status(500).json({ error: 'Failed to create Stripe session' });
      }
    } catch (error) {
      console.error('Error creating Stripe session:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  });
  

  
  module.exports = { registerUser, authUser, updateUserProfile, userPayment };