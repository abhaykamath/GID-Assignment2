const express = require("express");
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const router = express.Router();
const userModel = require("../models/users");
const { hashed, match } = require("../utils/passHash");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPass = hashed(password);
    const user = await userModel.create({ name, email, password: hashedPass });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (match(password, user.password)) {
      res.json({
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({ message: "Wrong Password" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
