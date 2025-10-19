const express = require("express");
const router = express.Router();
const {
  createDriver,
  getDrivers,
  getDriverById,
  updateDriver,
  deleteDriver,
} = require("../../controller/driver/driverController");

router.post("/add", createDriver);
router.get("/find", getDrivers);
router.get("/find/:id", getDriverById);
router.put("/update/:id", updateDriver);
router.delete("/delete/:id", deleteDriver);

module.exports = router;
