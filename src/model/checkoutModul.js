import mongoose from "mongoose";

export const GlamifyCheckoutSchema = new mongoose.Schema({
  phone: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  order: {
    type: Array,
    required: true,
  },
  cardNumber: {
    type: String,
    required: true,
  },
  cardExpiry: {
    type: String,
    required: true,
  },
  cardCVC: {
    type: String,
    required: true,
  },
});

export const GlamifyCheckout = mongoose.model(
  "GlamifyCheckout",
  GlamifyCheckoutSchema
);
