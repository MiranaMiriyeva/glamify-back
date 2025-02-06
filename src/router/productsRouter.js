import express from "express";
import {
  CreateProduct,
  DeleteProduct,
  GetAllProducts,
  GetOneProduct,
  UpdateProduct,
} from "../conrollers/productsControllers.js";

export const ProductsRouter = express.Router();
ProductsRouter.get("/", GetAllProducts);
ProductsRouter.get("/:id", GetOneProduct);

ProductsRouter.post("/", CreateProduct);

ProductsRouter.put("/:id", UpdateProduct);

ProductsRouter.delete("/:id", DeleteProduct);
