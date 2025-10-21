// const mongoose = require("mongoose");

// const bookingSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     pickup: { type: String, required: true },
//     dropoff: { type: String, required: true },
//     vehicleType: { type: String, required: true },
//     passengers: { type: Number, default: 1 },
//     date: { type: String, required: true },
//     time: { type: String, required: true },
//     returnDate: { type: String },
//     returnTime: { type: String },
//     riderName: { type: String, required: true },
//     riderPhone: { type: String, required: true },
//     bookingType: { type: String, required: true },
//     status: {
//       type: String,
//       enum: ["pending", "confirmed", "completed", "cancelled"],
//       default: "pending",
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Booking", bookingSchema);

const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
    },
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
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
    driverResponseTimeout: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
