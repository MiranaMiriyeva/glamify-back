import mongoose from "mongoose";

export const GlamifyUserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: "user" },
  basket: { type: Array, default: [] },
});

export const GlamifyUser = mongoose.model("GlamifyUser", GlamifyUserSchema);
