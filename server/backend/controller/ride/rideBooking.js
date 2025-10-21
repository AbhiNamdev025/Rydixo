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
    });

    await booking.save();

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
    console.log("Booking created:", booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid booking ID" });
    }

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBookingsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const bookings = await Booking.find({ userId });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid booking ID" });
    }

    const validStatuses = ["pending", "confirmed", "completed", "cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        error:
          "Invalid status. Must be: pending, confirmed, completed, or cancelled",
      });
    }

    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json({
      message: "Booking status updated successfully",
      booking,
    });
    console.log("Booking status updated:", booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid booking ID" });
    }

    const booking = await Booking.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json({
      message: "Booking updated successfully",
      booking,
    });
    console.log("Booking updated:", booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const respondToRide = async (req, res) => {
  try {
    const { rideId } = req.params;
    const { action, driverId } = req.body;

    if (!["accepted", "rejected"].includes(action)) {
      return res.status(400).json({ error: "Invalid action" });
    }

    const booking = await Booking.findById(rideId);
    if (!booking) {
      return res.status(404).json({ error: "Ride not found" });
    }

    if (action === "accepted") {
      booking.status = "confirmed";
      booking.driverId = driverId;
    } else {
      booking.status = "cancelled";
    }

    booking.driverResponseTimeout = undefined;
    await booking.save();

    res.json({
      message: `Ride ${action} successfully`,
      booking,
    });
  } catch (error) {
    console.error("Error responding to ride:", error);
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
};
