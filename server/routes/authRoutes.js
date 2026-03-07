const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const blacklist = require("../utils/tokenBlacklist");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getProfile);

router.post("/logout", authMiddleware, (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  blacklist.add(token);
  res.json({ message: "Logout successful" });
});

module.exports = router;