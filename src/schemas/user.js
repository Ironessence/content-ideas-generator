import mongoose, { Schema } from "mongoose";

const ideaSchema = new Schema({
  createdAt: {
    type: Date,
    required: true,
  },
  idea: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  script: {
    type: String,
    required: false,
  },
  isSaved: {
    type: Boolean,
    required: true,
  },
});

const transactionSchema = new Schema({
  createdAt: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

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
    savedIdeas: {
      type: [ideaSchema],
      default: [],
    },
  },
  {
    collection: "users",
  },
);

export const UserSchema = mongoose.models.UserSchema || mongoose.model("UserSchema", userSchema);
