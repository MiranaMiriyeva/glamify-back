import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { GlamifyUser } from "../model/userModel.js";

export const UserRouter = express.Router();
const secretkey = "JJIbdi90sy9v0-w03hSNDJSfhwh_302ynf";

UserRouter.get("/users", async (req, res) => {
  try {
    let data = await GlamifyUser.find();
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});
UserRouter.post("/users", async (req, res) => {
  try {
    let data = await GlamifyUser.create(req.body);
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});
UserRouter.delete("/users/:id", async (req, res) => {
  try {
    let data = await GlamifyUser.findByIdAndDelete(req.params.id);
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});
UserRouter.put("/users/:id", async (req, res) => {
  try {
    let data = await GlamifyUser.findByIdAndUpdate(req.params.id, req.body);
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});
UserRouter.get("/users/:id", async (req, res) => {
  try {
    let data = await GlamifyUser.findById(req.params.id);
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});
UserRouter.get("/profile", async (req, res) => {
  const token = req.header("Authorization");

  if (!token) return res.send({ error: "Access denied" });
  try {
    const decoded = jwt.verify(token, secretkey);
    res.send("welcome to your profile");
  } catch (error) {
    res.send({ error: "Invalid token" });
  }
});

UserRouter.get("/adminpanel", async (req, res) => {
  const token = req.header("Authorization");
  if (!token) return res.send({ error: "Access denied" });
  try {
    const decoded = jwt.verify(token, secretkey);
    req.userId = decoded.userId;
    console.log(decoded.role);
    if (decoded.role != "admin") {
      return res.send("No Access");
    } else {
      res.send("welcome to admin panel");
    }
  } catch (error) {
    res.send({ error: "Invalid token" });
  }
});

UserRouter.post("/users/register", async (req, res) => {
  try {
    let { email, password, role, username } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const obj = { email, username, password: hashedPassword, role };
    await GlamifyUser.create(obj);
    res.send(obj);
  } catch (error) {
    res.send(error);
  }
});

UserRouter.post("/users/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await GlamifyUser.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .send({ error: "Authentication failed. Wrong Email" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log(passwordMatch);

    if (!passwordMatch) {
      return res
        .status(400)
        .send({ error: "Authentication failed. Wrong Password" });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, secretkey, {
      expiresIn: "1h",
    });
    console.log(token);

    res.send({ token });
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});
UserRouter.delete("/users/:id", async (req, res) => {
  try {
    let data = await Users.findByIdAndDelete(req.params.id);
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});
//sfsf
