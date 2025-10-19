const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    status: { type: String },

    personal_info: {
      date_of_birth: { type: Date },
      gender: { type: String },
      contact_number: { type: String },
      permanent_address: { type: String },
    },

    bank_details: {
      account_holder_name: { type: String },
      account_number: { type: String },
      ifsc_code: { type: String },
      bank_name: { type: String },
    },

    identification_documents: {
      driving_licence: { type: String },
      aadhaar_card: { type: String },
      pan_card: { type: String },
      rc_number: { type: String },
    },

    vehicle_details: {
      vehicle_name: { type: String },
      vehicle_year: { type: Number },
      vehicle_number: { type: String },
      seat_availability: { type: Number },
      rc_validity: { type: String },
      insurance_details: { type: Date },
    },

    income: {
      daily: [
        {
          amount: { type: Number },
          rides: { type: Number },
        },
      ],
      weekly: [
        {
          amount: { type: Number },
          rides: { type: Number },
        },
      ],
      monthly: [
        {
          amount: { type: Number },
          rides: { type: Number },
        },
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Driver", driverSchema);
