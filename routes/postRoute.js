const express = require("express");
const postModel = require("../models/posts");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", protect, async (req, res) => {
  try {
    const posts = await postModel.find({ user: req.user._id });
    res.json({ posts });
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.post("/", protect, async (req, res) => {
  try {
    const { title, body } = req.body;
    const post = await postModel.create({
      title,
      body,
      user: req.user._id,
      name: req.user.name,
    });
    res.status(201).json({ ...post._doc, name: req.user.name });
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.put("/:id", protect, async (req, res) => {
  try {
    const postId = req.params.id;
    const postToUpdate = await postModel.findById(postId);
    if (!req.user._id.equals(postToUpdate.user)) {
      res.status(401).json({
        message: "Unauthorized",
      });
    } else {
      const post = await postModel.findByIdAndUpdate(postId, req.body);
      res.json({
        status: "Successfully updated",
      });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.delete("/:id", protect, async (req, res) => {
  try {
    const postId = req.params.id;
    const postToDelete = await postModel.findById(postId);
    if (!req.user._id.equals(postToDelete.user)) {
      res.status(401).json({
        message: "Unauthorized",
      });
    } else {
      const post = await postModel.findByIdAndDelete(postId);
      res.json({
        status: "Successfully deleted",
      });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;
