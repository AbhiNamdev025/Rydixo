const express = require("express");
const loginData = require("../../controller/login/loginController");
const router = express.Router();

router.post("/login", loginData.loginUser);

module.exports = router;
