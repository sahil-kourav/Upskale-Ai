const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model");

/**
 * @name registerUser
 * @route POST /api/auth/register
 * @desc Register a new user with phone, fullName, email and password in the request body
 * @access Public
 */
async function registerUser(req, res) {
  const { phone, fullName, email, password } = req.body;

  if (!fullName || !phone || !email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

    const emailExists = await userModel.findOne({ email });
    if (emailExists) {
      return res.status(409).json({ message: "User already exists with this email" });
    }

    const phoneExists = await userModel.findOne({ phone });

    if (phoneExists) {
      return res.status(409).json({ message: "User already exists with this phone number" });
    }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    phone,
    fullName,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      id: user._id,
      fullName: user.fullName,
      phone: user.phone,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "6d" },
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure:true,
    sameSite:"none",
    maxAge: 6 * 24 * 60 * 60 * 1000, // 6 days
  });

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: user._id,
      phone: user.phone,
      fullName: user.fullName,
      email: user.email,
      credits:user.credits
    },
  });
}

/**
 * @name loginUser
 * @route POST /api/auth/login
 * @desc Login a user with email and password in the request body
 * @access Public
 */
async function loginUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password" });
  }

  const user = await userModel.findOne({
    email,
  }).select("+password");;

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign(
    {
      id: user._id,
      phone: user.phone,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "6d" },
  );

  res.cookie("token", token, {
    httpOnly: true,
     secure:true,
     sameSite:"none",
    maxAge: 6 * 24 * 60 * 60 * 1000, // 6 days
  });

  res.status(200).json({
    message: "User logged in successfully",
    user: {
      id: user._id,
      phone: user.phone,
      fullName: user.fullName,
      email: user.email,
      credits:user.credits
    },
  });
}

/**
 * @name logoutUser
 * @route POST /api/auth/logout
 * @desc Logout a user by clearing the token cookie and adding the token to the blacklist
 * @access Public
 */
async function logoutUser(req, res) {
  const token = req.cookies.token;

  if (token) {
    await tokenBlacklistModel.create({ token });
  }

  res.clearCookie("token");

  res.status(200).json({ message: "User logged out successfully" });
}

/**
 * @name getUser
 * @route GET /api/auth/get-me
 * @desc Get the currently logged in user's information
 * @access Private
 */
async function getUser(req, res) {
  const user = await userModel.findById(req.user.id).select("-password");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({
    message: "User information fetched successfully",
    user: {
      id: user._id,
      phone: user.phone,
      fullName: user.fullName,
      email: user.email,
      credits: user.credits,
    },
  });
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
};
