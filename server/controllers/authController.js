const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  try {
    console.log('REGISTER BODY:', req.body);

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

<<<<<<< HEAD
    const exists = await User.findOne({
      $or: [{ email }, { username }],
    });

=======
    const exists = await User.findOne({ email });
>>>>>>> 8c97521e87be103f60ea6431101d3404b0cf7eff
    if (exists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
<<<<<<< HEAD
    console.error('REGISTER ERROR:', error);
    return res.status(500).json({ message: error.message });
=======
    return res.status(500).json({ message: 'Server error' });
>>>>>>> 8c97521e87be103f60ea6431101d3404b0cf7eff
  }
};

const loginUser = async (req, res) => {
  try {
    console.log('LOGIN BODY:', req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

<<<<<<< HEAD
    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('LOGIN ERROR:', error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser };
=======
    return res.json({ message: 'Login successful', token });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { registerUser, loginUser };
>>>>>>> 8c97521e87be103f60ea6431101d3404b0cf7eff
