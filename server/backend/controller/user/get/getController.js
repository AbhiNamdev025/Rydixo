const express = require("express");
const userModel = require("../../../model/user/userModel");
exports.getUser = async (req, res) => {
  try {
    const users = await userModel.User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json("Error in getting user", err);
  }
};
