const express = require("express");
const {protect} = require("../middleware/AuthMiddleware");
const router = express.Router();
const {registerUser,authUser,updateUserProfile,userPayment,orderdetails} = require("../Controller/userControllers");
router.route("/").post(registerUser)
router.route("/login").post(authUser)
router.route("/profile").post(protect,updateUserProfile);
router.route("/payment").post(userPayment);
router.route("/orders/:sessionId").get(orderdetails);
module.exports = router;