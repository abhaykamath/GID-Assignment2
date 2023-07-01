const express = require("express");
const userRoutes = require("./routes/userRoute");
const postsRoutes = require("./routes/postRoute");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const port = process.env.PORT;
const app = express();

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connected to DB...");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/posts", postsRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
