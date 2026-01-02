const mongoose = require("mongoose");
const BookingModel = require("../Models/BookingModel");

/* ================= CREATE BOOKING ================= */
const roomBooking = async (req, res) => {
  try {
    const { guest, name, phone, room, checkIn, checkout, guests, status } = req.body;

    // Required fields check
    if (!room || !checkIn || !checkout) {
      return res.status(400).json({
        success: false,
        message: "Room, CheckIn & Checkout are required",
      });
    }

    // Check room date overlap
    const roomBooked = await BookingModel.findOne({
      room,
      $or: [{ checkIn: { $lt: checkout }, checkout: { $gt: checkIn } }],
    });

    if (roomBooked) {
      return res.status(400).json({
        success: false,
        message: "Room already booked for selected dates",
      });
    }

    // ===== Calculate Discount =====
    let discountPercent = 0;
    if (guest) {
      const previousBookings = await BookingModel.countDocuments({ guest });
      if (previousBookings >= 1) discountPercent = 5; // Repeat user discount
    }

    // Create booking
    const booking = new BookingModel({
      guest: guest || null,
      name,
      phone,
      room,
      checkIn,
      checkout,
      guests: guests || 1,
      status: status || "reserved",
      discountPercent, // Save discount
    });

    await booking.save();

    // Populate for response
    const populatedBooking = await BookingModel.findById(booking._id)
      .populate("guest", "username useremail userrole phone")
      .populate("room", "RoomNumber type Status Price image");

    res.status(201).json({
      success: true,
      message: "Booking Created Successfully",
      booking: populatedBooking,
    });
  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/* ================= VIEW ALL BOOKINGS ================= */
const viewAllBooking = async (req, res) => {
  try {
    const bookings = await BookingModel.find()
      .populate("guest", "username useremail userrole phone")
      .populate("room", "RoomNumber type Status Price image");

    res.status(200).json({
      success: true,
      message: "All Bookings Retrieved Successfully",
      data: bookings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/* ================= GET SINGLE BOOKING ================= */
const getBooking = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid Booking Id" });
    }

    const booking = await BookingModel.findById(id)
      .populate("guest", "username useremail userrole phone")
      .populate("room", "RoomNumber type Status Price image");

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking Not Found" });
    }

    res.status(200).json({ success: true, booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/* ================= UPDATE BOOKING ================= */
const bookingUpdate = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid Booking Id" });
    }

    const updatedBooking = await BookingModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate("guest", "username useremail userrole phone")
      .populate("room", "RoomNumber type Status Price image");

    if (!updatedBooking) {
      return res.status(404).json({ success: false, message: "Booking Not Found" });
    }

    res.status(200).json({
      success: true,
      message: "Booking Updated Successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/* ================= DELETE BOOKING ================= */
const bookingDelete = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid Booking Id" });
    }

    const deletedBooking = await BookingModel.findByIdAndDelete(id);

    if (!deletedBooking) {
      return res.status(404).json({ success: false, message: "Booking Not Found" });
    }

    res.status(200).json({
      success: true,
      message: "Booking Deleted Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  roomBooking,
  viewAllBooking,
  getBooking,
  bookingUpdate,
  bookingDelete,
};
