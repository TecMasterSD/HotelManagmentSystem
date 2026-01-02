const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");

const AuthMiddleware = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.KEY);
    const user = await User.findById(decoded.id).select("-userpassword");

    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

module.exports = { AuthMiddleware };
