const express = require("express");
const card  = require("../Controller/cardsController");
const router = express.Router();
router.route("/").get(card);
module.exports = router;