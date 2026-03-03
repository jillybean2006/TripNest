const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const blacklist = require('../utils/blacklist');

router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/logout', authMiddleware, (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  blacklist.add(token);
  res.json({ message: 'Logout successful' });
});

module.exports = router;