const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User } = require("../../model/user/userModel");

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  console.log("Google OAuth configured successfully");
  console.log(
    "Google callback URL =>",
    `${process.env.BACKEND_URL}/auth/google/callback`
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log("Google OAuth profile received:", profile.displayName);

          let user = await User.findOne({
            $or: [{ email: profile.emails[0].value }, { googleId: profile.id }],
          });

          if (user) {
            console.log("Existing user found:", user.email);
            if (!user.googleId) {
              user.googleId = profile.id;
              user.authProvider = "google";
              await user.save();
            }
            return done(null, user);
          }

          // Create new user
          user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            phone: "",
            password: "",
            authProvider: "google",
            googleId: profile.id,
          });

          await user.save();
          console.log("New user created via Google OAuth:", user.email);
          done(null, user);
        } catch (error) {
          console.error("Google OAuth error:", error);
          done(error, null);
        }
      }
    )
  );
} else {
  console.warn("Google OAuth credentials not found. Google login disabled.");
}

module.exports = passport;
