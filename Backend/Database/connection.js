const mongoose = require("mongoose");

const MONGO_URL =
  "mongodb+srv://sivab2211:root@cluster0.wilizo0.mongodb.net/ElectZone";
const connectDB = async () => {
  try {
    const con = await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB is connected : ${con.connection.host}`);
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
