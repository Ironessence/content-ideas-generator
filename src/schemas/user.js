import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    email: String,
    name: String,
    diamonds: Number,
    image: String,
  },
  {
    collection: "users",
  },
);

export const UserSchema = mongoose.models.UserSchema || mongoose.model("UserSchema", userSchema);
