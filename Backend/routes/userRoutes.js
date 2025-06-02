const express = require("express");
const bodyParser = require("body-parser");
const {protect} = require("../middleware/AuthMiddleware");
const router = express.Router();
const {registerUser,loginUser,updateUserProfile,userPayment,getUser,clearUserCart,
    removeUserItem,increaseQuantity,decreaseQuantity,resetPassword,Updatepassword} = require("../Controller/userControllers");
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/profile/:id").post(protect,updateUserProfile);
router.route("/payment").post(protect,userPayment);
router.route("/userDetails/:id").get(getUser)
router.route("/clearCart/:id").delete(protect,clearUserCart)
router.route("/:userId/removeItem/:productId").delete(protect,removeUserItem);
router.route("/:userId/increaseQuantity/:productId").patch(protect,increaseQuantity)
router.route("/:userId/decreaseQuantity/:productId").patch(protect,decreaseQuantity)
router.route("/forgetpassword").post(resetPassword)
router.patch('/updatepassword/:userId/:token', Updatepassword);
module.exports = router;