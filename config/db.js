const mongoose = require("mongoose");
const { MONGO_URI } = require("./index");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: false,
};

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, options);
    console.log("Connected to the DB");
  } catch (error) {
    console.error("Error connecting to the DB:", error);
  }
};

module.exports = connectDB;
