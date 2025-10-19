const express = require("express");
const router = express.Router();
const {
  createBooking,
  getBookings,
  getBookingById,
  getBookingsByUserId,
  updateBookingStatus,
  updateBooking,
} = require("../../controller/ride/rideBooking");

router.post("/add", createBooking);
router.get("/find", getBookings);
router.get("/find/:id", getBookingById);
router.get("/find/user/:userId", getBookingsByUserId);
router.patch("/update-status/:id", updateBookingStatus);
router.put("/update/:id", updateBooking);

module.exports = router;
