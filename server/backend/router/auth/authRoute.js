const express = require("express");
const passport = require("../../controller/auth/authController");
const router = express.Router();

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Google OAuth routes
router.get(
  "/google",
  passport.authenticate("google", { 
    scope: ["profile", "email"],
    prompt: "select_account" // Forces account selection
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { 
    failureRedirect: `${FRONTEND_URL}/login?error=auth_failed` 
  }),
  (req, res) => {
    // Successful authentication
    console.log('Google OAuth successful for user:', req.user.email);
    res.redirect(`${FRONTEND_URL}/`);
  }
);

// Logout route
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.redirect(`${FRONTEND_URL}/login`);
  });
});

// Debug route to check OAuth status
router.get("/status", (req, res) => {
  res.json({
    authenticated: req.isAuthenticated(),
    user: req.user || null,
    googleConfigured: !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET)
  });
});

module.exports = router;