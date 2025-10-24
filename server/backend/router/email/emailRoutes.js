const express = require("express");
const router = express.Router();
const {
  storeEmail,
  getEmails,
} = require("../../controller/email/emailController");

// Store email
router.post("/subscribe", storeEmail);

// Get all emails
router.get("/emails", getEmails);

module.exports = router;
