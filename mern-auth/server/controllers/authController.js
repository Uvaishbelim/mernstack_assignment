const bcrypt = require("bcrypt");
const User = require("../models/user");
const generateToken = require("../utils/generateToken");

// =======================
// Register User
// =======================

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields"
      });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      success: true,
      message: "Registration Successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      },
      token: generateToken(user._id)
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// =======================
// Login User
// =======================

const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;

    if (!email || !password) {

      return res.status(400).json({
        success: false,
        message: "Please fill all fields"
      });

    }

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(401).json({
        success: false,
        message: "Invalid Email or Password"
      });

    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {

      return res.status(401).json({
        success: false,
        message: "Invalid Email or Password"
      });

    }

    res.status(200).json({

      success: true,

      message: "Login Successful",

      user: {

        _id: user._id,

        name: user.name,

        email: user.email

      },

      token: generateToken(user._id)

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

const getProfile = async (req, res) => {

    try {
  
      res.status(200).json({
  
        success: true,
  
        user: req.user
  
      });
  
    } catch (error) {
  
      res.status(500).json({
  
        success: false,
  
        message: error.message
  
      });
  
    }
  
  };

module.exports = {

  registerUser,

  loginUser,

  getProfile

};