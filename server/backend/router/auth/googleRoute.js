const express = require("express");
const passport = require("../../controller/auth/googleAuth");
const router = express.Router();
const jwt = require("jsonwebtoken");

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// Start Google OAuth
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

// Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: `${FRONTEND_URL}/login?error=auth_failed` }),
  (req, res) => {
    try {
      // Generate JWT token
      const token = jwt.sign({ id: req.user._id }, process.env.JWT_Secret_Key, { expiresIn: "1h" });

      const redirectUrl = `${FRONTEND_URL}/auth/google/success?token=${token}&name=${encodeURIComponent(req.user.name)}`;
      res.redirect(redirectUrl);
    } catch (err) {
      console.error("JWT generation error:", err);
      res.redirect(`${FRONTEND_URL}/login?error=token_failed`);
    }
  }
);

// Logout
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ error: "Logout failed" });
    res.redirect(`${FRONTEND_URL}/login`);
  });
});

module.exports = router;
