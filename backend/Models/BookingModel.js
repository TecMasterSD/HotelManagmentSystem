const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    guest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null, // optional, guest booking possible
    },
    name: {
      type: String, // required for guest booking
    },
    phone: {
      type: String, // required for guest booking
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    checkIn: {
      type: Date,
      required: true,
    },
    checkout: {
      type: Date,
      required: true,
    },
    guests: {
      type: Number,
      default: 1,
    },
    status: {
      type: String,
      enum: ["reserved", "checked-in", "checked-out"],
      default: "reserved",
    },
    discountPercent: {
      type: Number,
      default: 0, // repeat user discount
    },
  },
  { timestamps: true }
);

const Booking = mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
module.exports = Booking;
