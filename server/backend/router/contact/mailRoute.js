const express = require("express");
const sendContactEmail = require("../../controller/contact/contactMail");

const router = express.Router();
router.post("/contact", sendContactEmail);

module.exports = router;
