const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String },
  image: { type: String }, // use image url
  user: { type: Schema.Types.ObjectId, ref: "users" },
});

const postModel = mongoose.model("posts", postSchema);

module.exports = postModel;
