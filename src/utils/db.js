import mongoose from "mongoose";

const db = () => {
  try {
    mongoose.connect(process.env.MONGO);
  } catch (err) {}
};

export default db;
