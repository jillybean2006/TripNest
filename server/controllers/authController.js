const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const registerUser = async (req, res) => {
  try {
    console.log("REGISTER BODY:", req.body);

    const { name, email, password } = req.body;


    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    
    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

  
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    
    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


const loginUser = async (req, res) => {
  try {
    console.log("LOGIN BODY:", req.body);

    const { email, password } = req.body;

    
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

  
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("PROFILE ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
};