const express = require("express");
const bodyParser = require("body-parser");
const {protect} = require("../middleware/AuthMiddleware");
const router = express.Router();
const {registerUser,loginUser,updateUserProfile,userPayment,getUser,clearUserCart,
    removeUserItem,increaseQuantity,decreaseQuantity} = require("../Controller/userControllers");
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/profile/:id").post(protect,updateUserProfile);
router.route("/payment").post(userPayment);
router.route("/userDetails/:id").get(getUser)
router.route("/clearCart/:id").delete(clearUserCart)
router.route("/:userId/removeItem/:productId").delete(removeUserItem);
router.route("/:userId/increaseQuantity/:productId").patch(increaseQuantity)
router.route("/:userId/decreaseQuantity/:productId").patch(decreaseQuantity)
module.exports = router;