import express from "express";
import {
  CreateCheckout,
  DeleteCheckout,
  GetAllCheckouts,
  GetOneCheckout,
  UpdateCheckout,
} from "../conrollers/checkoutControllers.js";

export const CheckoutRouter = express.Router();
CheckoutRouter.get("/", GetAllCheckouts);
CheckoutRouter.get("/:id", GetOneCheckout);

CheckoutRouter.post("/", CreateCheckout);

CheckoutRouter.put("/:id", UpdateCheckout);

CheckoutRouter.delete("/:id", DeleteCheckout);
