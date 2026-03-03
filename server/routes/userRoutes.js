const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');
const bcrypt = require('bcryptjs');



router.get('/me', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('PROFILE ERROR:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/me', authMiddleware, async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('PROFILE UPDATE ERROR:', error);
        res.status(500).json({ message: 'Server error' });
    }
});



router.put('/update', authMiddleware, async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (username) user.username = username;
        if (email) user.email = email;
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        await user.save();

        const safeUser = user.toObject();
        delete safeUser.password;
        res.json({ message: 'Profile updated successfully', user: safeUser });



    } catch (error) {
        console.error('PROFILE UPDATE ERROR:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;