const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Validate user input (e.g., email format, password strength)
    // ...

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({ name, email, password: hashedPassword, phone });
    await user.save();

    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    user.password = undefined;

    res.json({ accessToken, refreshToken, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
};

const getAllUsers = async (req, res) => {
  const users = await User.find({}, { password: 0 });
  // users[0].password = undefined;
  if (!users) {
    res.json({
      status: false,
      message: "Users are not Available",
    });
  }
  res.json({
    users,
  });
};

module.exports = { register, login, getAllUsers };
