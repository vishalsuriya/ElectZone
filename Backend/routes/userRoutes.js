const express = require("express");
const {protect} = require("../middleware/AuthMiddleware");
const router = express.Router();
const {registerUser,authUser,updateUserProfile,usercart,userPayment} = require("../Controller/userControllers");
router.route("/").post(registerUser)
router.route("/login").post(authUser)
router.route("/profile").post(protect,updateUserProfile);
router.route("/usercart").post(usercart)
router.route("/payment").post(userPayment);
module.exports = router;