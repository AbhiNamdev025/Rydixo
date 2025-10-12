const nodemailer = require("nodemailer");

const sendContactEmail = async (req, res) => {
  try {
    const { firstName, lastName, number, email, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Contact form submission from ${firstName} ${lastName}`,
      text: `
        Name: ${firstName} ${lastName}
        Phone: ${number}
        Email: ${email}
        Message: ${message}
      `,
    };

    await transporter.sendMail(mailOptions);
    res
      .status(200)
      .json({ success: true, message: "Email sent successfully!" });
    console.log(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Failed to send email." });
  }
};

module.exports = sendContactEmail;
