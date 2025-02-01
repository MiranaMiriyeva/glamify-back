import express from "express";
import mongoose from "mongoose";

import cors from "cors";

const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());
const GlamifyProductsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subcategory: {
    type: String,
    required: true,
  },
  price: {
    type: String,
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

const GlamifyProducts = mongoose.model(
  "GlamifyProducts",
  GlamifyProductsSchema
);
app.get("/glamify/products", async (req, res) => {
  try {
    let data = await GlamifyProducts.find();
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});
app.get("/glamify/products/:id", async (req, res) => {
  try {
    let data = await GlamifyProducts.findById(req.params.id);
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});

app.post("/glamify/products", async (req, res) => {
  try {
    let data = await GlamifyProducts.create(req.body);
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});

app.put("/glamify/products/:id", async (req, res) => {
  try {
    let data = await GlamifyProducts.findByIdAndUpdate(req.params.id, req.body);
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});

app.delete("/glamify/products/:id", async (req, res) => {
  try {
    let data = await GlamifyProducts.findByIdAndDelete(req.params.id);
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});

app.listen(port, async () => {
  await mongoose
    .connect(
      "mongodb+srv://miranafmbp216:miranafmbp216@cluster0.wphbo.mongodb.net/"
    )
    .catch((err) => console.log(err));

  console.log(`Example app listening on port ${port}`);
});
