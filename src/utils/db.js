import mongoose from "mongoose";

const db = () => {
  try {
    mongoose.connect(process.env.MONGO);
    console.log("connected to MONGODB");
  } catch (err) {
    console.log("err:", err);
  }
};

export default db;
