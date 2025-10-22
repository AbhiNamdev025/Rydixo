const Booking = require("../../model/ride/ride");
const mongoose = require("mongoose");

const createBooking = async (req, res) => {
  try {
    const {
      userId,
      pickup,
      dropoff,
      vehicleType,
      passengers,
      date,
      time,
      returnDate,
      returnTime,
      riderName,
      riderPhone,
      bookingType,
      fare,
    } = req.body;
    const booking = new Booking({
      userId,
      pickup,
      dropoff,
      vehicleType,
      passengers: passengers || 1,
      date,
      time,
      returnDate,
      returnTime,
      riderName,
      riderPhone,
      bookingType,
      fare: fare || 0,
    });
    await booking.save();
    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId", "name email phone")
      .populate("driverId", "name phone vehicle_details");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ error: "Invalid booking ID" });
    const booking = await Booking.findById(id)
      .populate("userId", "name email phone")
      .populate("driverId", "name phone vehicle_details");
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBookingsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId))
      return res.status(400).json({ error: "Invalid user ID" });
    const bookings = await Booking.find({ userId }).populate(
      "driverId",
      "name phone vehicle_details"
    );
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ error: "Invalid booking ID" });
    const validStatuses = [
      "pending",
      "confirmed",
      "ongoing",
      "completed",
      "cancelled",
    ];
    if (!validStatuses.includes(status))
      return res.status(400).json({ error: "Invalid status" });
    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    )
      .populate("userId", "name email phone")
      .populate("driverId", "name phone vehicle_details");
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res
      .status(200)
      .json({ message: "Booking status updated successfully", booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ error: "Invalid booking ID" });
    const booking = await Booking.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })
      .populate("userId", "name email phone")
      .populate("driverId", "name phone vehicle_details");
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.status(200).json({ message: "Booking updated successfully", booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const respondToRide = async (req, res) => {
  try {
    const { rideId } = req.params;
    const { action, driverId, otp } = req.body;
    if (!["accepted", "rejected"].includes(action))
      return res.status(400).json({ error: "Invalid action" });
    const booking = await Booking.findById(rideId).populate(
      "userId",
      "name email phone"
    );
    if (!booking) return res.status(404).json({ error: "Ride not found" });
    if (action === "accepted") {
      booking.status = "confirmed";
      booking.driverId = driverId;
      booking.otp = otp;
    } else booking.status = "cancelled";
    booking.driverResponseTimeout = undefined;
    await booking.save();
    await booking.populate("driverId", "name phone vehicle_details");
    res.json({
      success: true,
      message: `Ride ${action} successfully`,
      booking,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const startRide = async (req, res) => {
  try {
    const { rideId } = req.params;
    const { otp } = req.body;
    if (!mongoose.Types.ObjectId.isValid(rideId))
      return res.status(400).json({ error: "Invalid ride ID" });
    const booking = await Booking.findById(rideId)
      .populate("userId", "name email phone")
      .populate("driverId", "name phone vehicle_details");
    if (!booking) return res.status(404).json({ error: "Ride not found" });
    if (booking.status !== "confirmed")
      return res.status(400).json({
        error: "Ride must be confirmed before starting",
        currentStatus: booking.status,
      });
    if (booking.otp !== parseInt(otp))
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    booking.status = "ongoing";
    booking.startTime = new Date();
    await booking.save();
    res.json({ success: true, booking, message: "Ride started successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const completeRide = async (req, res) => {
  try {
    const { rideId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(rideId))
      return res.status(400).json({ error: "Invalid ride ID" });
    const booking = await Booking.findById(rideId)
      .populate("userId", "name email phone")
      .populate("driverId", "name phone vehicle_details");
    if (!booking) return res.status(404).json({ error: "Ride not found" });
    if (booking.status !== "ongoing")
      return res.status(400).json({
        error: "Ride must be ongoing to complete",
        currentStatus: booking.status,
      });
    booking.status = "completed";
    booking.endTime = new Date();
    await booking.save();
    res.json({
      success: true,
      booking,
      message: "Ride completed successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createBooking,
  getBookings,
  getBookingById,
  getBookingsByUserId,
  updateBookingStatus,
  updateBooking,
  respondToRide,
  startRide,
  completeRide,
};
