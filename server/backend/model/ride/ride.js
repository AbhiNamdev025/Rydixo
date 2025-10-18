const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  // User_Id
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // Ride
  pickup: { type: String, required: true },
  dropoff: { type: String, required: true },
  vehicleType: { type: String, required: true },
  passengers: { type: Number, default: 1 },
  date: { type: String, required: true },
  time: { type: String, required: true },
  returnDate: { type: String },
  returnTime: { type: String },
  riderName: { type: String, required: true },
  riderPhone: { type: String, required: true },
  bookingType: { type: String, required: true },
});

module.exports = mongoose.model("Booking", bookingSchema);
