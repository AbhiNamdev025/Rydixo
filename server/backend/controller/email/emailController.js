const Email = require("../../model/email/email");

// Store email

const storeEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const newEmail = new Email({
      email,
    });

    await newEmail.save();

    res.status(200).json({
      success: true,
      message: "Email stored successfully",
    });
  } catch (error) {
    console.error("Error storing email:", error);
    res.status(500).json({
      success: false,
      message: "Error storing email",
    });
  }
};

// Get all emails

const getEmails = async (req, res) => {
  try {
    const emails = await Email.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: emails,
    });
  } catch (error) {
    console.error("Error fetching emails:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching emails",
    });
  }
};

module.exports = {
  storeEmail,
  getEmails,
};
