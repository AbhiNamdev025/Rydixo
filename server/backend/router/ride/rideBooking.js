const express = require("express");
const router = express.Router();
const {
  createBooking,
  getBookings,
  getBookingById,
  getBookingsByUserId,
  updateBookingStatus,
  updateBooking,
  respondToRide,
  startRide,
  completeRide,
} = require("../../controller/ride/rideBooking");

router.post("/add", createBooking);
router.get("/find", getBookings);
router.get("/find/:id", getBookingById);
router.get("/find/user/:userId", getBookingsByUserId);
router.patch("/update-status/:id", updateBookingStatus);
router.put("/update/:id", updateBooking);
router.post("/:rideId/respond", respondToRide);
router.post("/:rideId/start", startRide);
router.post("/:rideId/complete", completeRide);

module.exports = router;
