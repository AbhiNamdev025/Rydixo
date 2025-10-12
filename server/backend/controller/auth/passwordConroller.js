require("dotenv").config();
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../model/user/userModel");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendVerificationCode = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // OTP
    const code = Math.floor(1000 + Math.random() * 9000);

    //  email
    await transporter.sendMail({
      from: `"Rydixo Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Rydixo Password Reset Verification Code",
      html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #1a73e8;">Rydixo</h2>
      <p>Hi,</p>
      <p>We received a request to reset your Rydixo account password.</p>
      <p><strong>Your verification code is:</strong></p>
      <h3 style="background: #f1f1f1; padding: 10px; display: inline-block;">${code}</h3>
      <p>This code will expire in 15 minutes. If you didn't request a password reset, please ignore this email.</p>
      <p>Thank you,<br>The Rydixo Team</p>
      <hr style="border: none; border-top: 1px solid #eee;">
      <small style="color: #888;">Rydixo © ${new Date().getFullYear()}. All rights reserved.</small>
    </div>
  `,
    });

    res.status(200).json({ message: "Code sent", code });
  } catch (err) {
    console.error("Error sending code:", err);
    res.status(500).json({ message: "Failed to send code" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // hash password 
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    // generate 
    const token = jwt.sign({ id: user._id }, process.env.JWT_Secret_Key, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "Password reset successfully",
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Error resetting password:", err);
    res.status(500).json({ message: "Failed to reset password" });
  }
};
