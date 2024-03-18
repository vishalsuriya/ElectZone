const bodyParser = require("body-parser");
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("../Backend/Database/connection");
const userRoutes  = require("./routes/userRoutes.js");
const {notFound,errorHandler} = require("../Backend/middleware/ErrorMiddleware.js");
const cardsRoutes = require("../Backend/routes/CardsRoutes.js");
const cors = require('cors');
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
connectDB();

app.use("/api/users",userRoutes);
app.use("/api/cards",cardsRoutes);
app.use(notFound);
app.use(errorHandler);






const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
