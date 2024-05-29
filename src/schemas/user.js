import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema(
  {
    createdAt: {
      type: Date,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  {
    _id: false, // Prevents creating a unique _id for each subdocument
  },
);

const userSchema = new Schema(
  {
    email: String,
    name: String,
    tokens: Number,
    image: String,
    transactions: {
      type: [transactionSchema],
      default: [],
    },
  },
  {
    collection: "users",
  },
);

export const UserSchema = mongoose.models.UserSchema || mongoose.model("UserSchema", userSchema);
