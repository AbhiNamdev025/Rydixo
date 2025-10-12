const express = require("express");
const router = express.Router();
const {
  sendVerificationCode,
  resetPassword,
} = require("../../controller/auth/passwordConroller");

// Send code
router.post("/send-code", sendVerificationCode);

// Reset password
router.post("/reset-password", resetPassword);

module.exports = router;
