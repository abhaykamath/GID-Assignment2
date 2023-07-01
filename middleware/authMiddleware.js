const jwt = require("jsonwebtoken");
const userModel = require("../models/users");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Get user from token
      req.user = await userModel.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      res.json({ message: error.message });
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(400);
    res.json({ message: "Not authorized, no token" });
    throw new Error("Not authorized, no token");
  }
};

module.exports = {
  protect,
};
