const Driver = require("../../model/driver/driver");
const bcrypt = require("bcrypt");

// Create driver
const createDriver = async (req, res) => {
  try {
    console.log("Before Hashing request body", req.body.password);

    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);

    req.body.password = hashedPassword;
    console.log("After Updating request body", req.body);

    const driverData = await Driver.create({
      ...req.body,
      email: req.body.email.toLowerCase(),
    });

    res.status(201).json(driverData);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error creating driver", error: err.message });
  }
};

// Get all drivers
const getDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.json(drivers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get driver by ID
const getDriverById = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    if (!driver) {
      return res.status(404).json({ error: "Driver not found" });
    }
    res.json(driver);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update driver
const updateDriver = async (req, res) => {
  try {
    const { password, ...otherData } = req.body;

    // Hash password if provided in update
    let updateData = { ...otherData };
    if (password) {
      const saltRounds = 10;
      updateData.password = await bcrypt.hash(password, saltRounds);
    }

    const driver = await Driver.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!driver) {
      return res.status(404).json({ error: "Driver not found" });
    }
    res.json(driver);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete driver
const deleteDriver = async (req, res) => {
  try {
    const driver = await Driver.findByIdAndDelete(req.params.id);
    if (!driver) {
      return res.status(404).json({ error: "Driver not found" });
    }
    res.json({ message: "Driver deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createDriver,
  getDrivers,
  getDriverById,
  updateDriver,
  deleteDriver,
};
