import express from "express";
import mongoose from "mongoose";
import { authenticateToken } from "../middleware/auth.js";

const BasketRouter = express.Router();

const BasketSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      name: String,
      mainImage: String,
      price: Number,
      colors: [
        {
          colorName: String,
          colorImages: [String],
          quantity: { type: Number, default: 1 },
        },
      ],
    },
  ],
});

const Basket = mongoose.model("Basket", BasketSchema);

// Sepeti Getir
BasketRouter.get("/basket", authenticateToken, async (req, res) => {
  try {
    const basket = await Basket.findOne({ userId: req.userId });
    res.json(basket || { items: [] });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Sepete Ürün Ekle
BasketRouter.post("/basket/add", authenticateToken, async (req, res) => {
  try {
    const { productId, name, mainImage, price, colorName, colorImages } =
      req.body;

    console.log("UserID:", req.userId); // Check if userID is correct
    let basket = await Basket.findOne({ userId: req.userId });
    console.log("Basket before update:", basket);

    if (!basket) {
      basket = new Basket({ userId: req.userId, items: [] });
    }

    let product = basket.items.find((item) => item.productId.equals(productId));
    if (product) {
      let color = product.colors.find((c) => c.colorName === colorName);
      if (color) {
        color.quantity += 1;
      } else {
        product.colors.push({ colorName, colorImages, quantity: 1 });
      }
    } else {
      basket.items.push({
        productId,
        name,
        mainImage,
        price,
        colors: [{ colorName, colorImages, quantity: 1 }],
      });
    }

    await basket.save();
    res.json(basket);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Miktarı Güncelle (Increase / Decrease)
BasketRouter.put("/basket/update", authenticateToken, async (req, res) => {
  try {
    const { productId, colorName, change } = req.body;
    const basket = await Basket.findOne({ userId: req.userId });

    if (!basket) return res.status(404).json({ error: "Basket not found" });

    // Ürünü bul
    let product = basket.items.find((item) => item.productId.equals(productId));
    if (!product) return res.status(404).json({ error: "Product not found" });

    // Rengi bul
    let color = product.colors.find((c) => c.colorName === colorName);
    if (!color) return res.status(404).json({ error: "Color not found" });

    // Renk miktarını güncelle
    color.quantity += change;

    // Miktar sıfır veya negatifse, rengi çıkar
    if (color.quantity <= 0) {
      product.colors = product.colors.filter((c) => c.colorName !== colorName);
    }

    // Ürün renkleri bittiğinde, ürünü sepetten kaldır
    if (product.colors.length === 0) {
      basket.items = basket.items.filter(
        (item) => !item.productId.equals(productId)
      );
    }

    await basket.save();
    res.json(basket);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Ürünü Sepetten Kaldır
BasketRouter.delete("/basket/remove", authenticateToken, async (req, res) => {
  try {
    const { productId } = req.body;
    let basket = await Basket.findOne({ userId: req.userId });
    if (!basket) return res.status(404).json({ error: "Basket not found" });

    // Sepetten ürünü kaldır
    basket.items = basket.items.filter(
      (item) => !item.productId.equals(productId)
    );
    await basket.save();
    res.json(basket);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

export default BasketRouter;
