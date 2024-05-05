const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const con = await mongoose.connect(
      "mongodb+srv://isharamadusanka0714:235689@cluster0.hz5h9vs.mongodb.net/NASA"
    );
    console.log(`MongoDB connected : ${con.connection.host} 😎`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
module.exports = connectDb;
