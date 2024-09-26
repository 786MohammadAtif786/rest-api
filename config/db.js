const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async() => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL || `mongodb://localhost:27017/testDB` );
    console.log(`Database Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
}
module.exports = connectDB;