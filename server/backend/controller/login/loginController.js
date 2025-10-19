const express = require("express");
const userModel = require("../../model/user/userModel");
const driverModel = require("../../model/driver/driver");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.loginUser = async (req, res) => {
  try {
    console.log("Login request body", req.body);
    const { email, password } = req.body;

    // Check  user
    let userMatch = await userModel.User.findOne({ email });
    let userType = "user";

    // If nt user, then go for Drivers
    if (!userMatch) {
      userMatch = await driverModel.findOne({ email });
      userType = "driver";
    }

    console.log("User found", userMatch);

    if (!userMatch) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    // Check if password exists before comparing
    if (!userMatch.password) {
      console.log("No password set for this account");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, userMatch.password);
    console.log("Password match", passwordMatch);

    if (!passwordMatch) {
      console.log("Invalid credentials");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: userMatch._id }, process.env.JWT_Secret_Key, {
      expiresIn: "1h",
    });
    console.log("Login successful, token generated", token);

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: userMatch._id,
        name: userMatch.name,
        email: userMatch.email,
        phone: userMatch.phone,
        role: userType,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};
