const express = require("express");
const { card,CircleCard1,CircleCard2,CircleCard3,CircleCard4,CircleCard5,allCards} 
 = require("../Controller/cardsController");
const router = express.Router();
router.route("/").get(card);
router.route("/CircleCards1").get(CircleCard1)
router.route("/CircleCards2").get(CircleCard2)
router.route("/CircleCards3").get(CircleCard3)
router.route("/CircleCards4").get(CircleCard4)
router.route("/CircleCards5").get(CircleCard5)
router.route("/allcards").get(allCards)
module.exports = router;    