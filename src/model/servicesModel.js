import mongoose from "mongoose";

export const GlamifyServicesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  details: {
    type: Array,
    required: true,
  },
  images: {
    type: Array,
    required: true,
  },
});

export const GlamifyServices = mongoose.model(
  "GlamifyServices",
  GlamifyServicesSchema
);
