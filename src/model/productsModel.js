import mongoose from "mongoose";

export const GlamifyProductsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  salePercent: Number,
  description: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
  },
  howToUse: {
    type: String,
    required: true,
  },
  mainImage: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },

  colors: [
    {
      colorName: String,
      outOfStock: Boolean,
      colorImages: Array,
    },
  ],
});

export const GlamifyProducts = mongoose.model(
  "GlamifyProducts",
  GlamifyProductsSchema
);
