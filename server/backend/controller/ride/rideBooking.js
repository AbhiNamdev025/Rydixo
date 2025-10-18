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

    //all required
    if (
      !userId ||
      !pickup ||
      !dropoff ||
      !vehicleType ||
      !date ||
      !time ||
      !riderName ||
      !riderPhone ||
      !bookingType
    ) {
      return res
        .status(400)
        .json({ error: "All required fields must be provided" });
    }

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

module.exports = {
  createBooking,
  getBookings,
  getBookingById,
  getBookingsByUserId,
};
