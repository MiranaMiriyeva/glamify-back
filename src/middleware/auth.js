import jwt from "jsonwebtoken";

const secretkey = "JJIbdi90sy9v0-w03hSNDJSfhwh_302ynf"; // Aynı secret key olmalı

export const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, secretkey);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid token." });
  }
};
