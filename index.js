import express from "express";
import mongoose from "mongoose";

import cors from "cors";
import { ProductsRouter } from "./src/router/productsRouter.js";
import { ServicesRouter } from "./src/router/servicesRouter.js";
import { BlogsRouter } from "./src/router/blogsRouter.js";

import { UserRouter } from "./src/router/userRouter.js";
import BasketRouter from "./src/router/basketRouter.js";

const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());
app.use("/glamify/products/", ProductsRouter);
app.use("/glamify/services/", ServicesRouter);
app.use("/glamify/blogs/", BlogsRouter);
app.use("/glamify/", UserRouter);
app.use("/", BasketRouter);

app.listen(port, async () => {
  await mongoose
    .connect(
      "mongodb+srv://miranafmbp216:miranafmbp216@cluster0.wphbo.mongodb.net/"
    )
    .catch((err) => console.log(err));

  console.log(`Example app listening on port ${port}`);
});
