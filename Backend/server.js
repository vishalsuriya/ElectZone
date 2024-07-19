const bodyParser = require("body-parser");
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("../Backend/Database/connection");
const userRoutes = require("./routes/userRoutes.js");
const {
  notFound,
  errorHandler,
} = require("../Backend/middleware/ErrorMiddleware.js");
const cardsRoutes = require("../Backend/routes/CardsRoutes.js");

const cards = require("./model/CardModel.js");
const card1 = require("./model/Card1Model.js");
const card2 = require("./model/Card2Model.js");
const card3 = require("./model/Card3Model.js");
const card4 = require("./model/Card4Model.js");
const card5 = require("./model/Card5Model.js");

const cors = require("cors");
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
connectDB();

app.use("/api/users", userRoutes);
app.use("/api/cards", cardsRoutes);

app.get("/api/allcards", async (req, res) => {
  try {
    const homecards = await cards.find();
    const cards1 = await card1.find();
    const cards2 = await card2.find();
    const cards3 = await card3.find();
    const cards4 = await card4.find();
    const cards5 = await card5.find();
    res.status(200).json({ homecards, cards1, cards2, cards3, cards4, cards5 });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
