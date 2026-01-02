const mongoose = require("mongoose");
const Bill = require("../Models/BillingModel");
const Booking = require("../Models/BookingModel");
const User = require("../Models/UserModel");
const Room = require("../Models/RoomModel");

// ===== CREATE BILL =====
const createBillFromBooking = async (req, res) => {
    try {
        const { bookingId, perDayPrice, services } = req.body;

        if (!bookingId || !perDayPrice) {
            return res.status(400).json({ success: false, message: "bookingId and perDayPrice are required" });
        }

        let booking = await Booking.findById(bookingId)
            .populate("guest")
            .populate("room");

        if (!booking) {
            return res.status(404).json({ success: false, message: "Booking not found" });
        }

        // ===== HANDLE MISSING GUEST =====
        if (!booking.guest) {
            const defaultGuest = await User.findOne(); // First user as default
            if (!defaultGuest) {
                return res.status(400).json({ success: false, message: "No guest found and no default user available" });
            }
            booking.guest = defaultGuest;
        }

        // ===== HANDLE MISSING ROOM =====
        if (!booking.room) {
            const defaultRoom = await Room.findOne(); // First room as default
            if (!defaultRoom) {
                return res.status(400).json({ success: false, message: "No room found and no default room available" });
            }
            booking.room = defaultRoom;
        }

        // ===== CHECK IF BILL EXISTS =====
        const existingBill = await Bill.findOne({ booking: bookingId });
        if (existingBill) {
            return res.status(400).json({ success: false, message: "Bill already created for this booking" });
        }

        // ===== CALCULATE TOTAL =====
        const checkIn = new Date(booking.checkIn);
        const checkout = new Date(booking.checkout);
        let totalDays = Math.ceil((checkout - checkIn) / (1000 * 60 * 60 * 24));
        if (totalDays <= 0) totalDays = 1;

        const roomAmount = totalDays * perDayPrice;
        const servicesTotal = services?.reduce((sum, s) => sum + s.price, 0) || 0;
        const totalAmount = roomAmount + servicesTotal;

        // ===== CREATE BILL =====
        const bill = new Bill({
            booking: booking._id,
            guest: booking.guest._id,
            room: booking.room._id,
            amount: totalAmount,
            services: services || [],
            status: req.body.status || "pending",
            paid: false,
            paymentMethod: req.body.paymentMethod || "cash"
        });

        await bill.save();

        res.status(201).json({ success: true, bill });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// ===== VIEW ALL BILLS =====
const ViewBill = async (req, res) => {
    try {
        const bills = await Bill.find()
            .populate("booking", "checkIn checkout")
            .populate("guest", "username useremail")
            .populate("room", "RoomNumber type")
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, count: bills.length, bills });

    } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// ===== GET BILL BY ID =====
const getById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid Bill ID" });
        }

        const bill = await Bill.findById(id)
            .populate("booking", "checkIn checkout")
            .populate("guest", "username useremail")
            .populate("room", "RoomNumber type");

        if (!bill) return res.status(404).json({ success: false, message: "Bill not found" });

        res.status(200).json({ success: true, bill });

    } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// ===== UPDATE BILL =====
const updateBill = async (req, res) => {
    try {
        const { id } = req.params;
        const { amount, status, paymentMethod } = req.body;

        if (!id) return res.status(400).json({ success: false, message: "Bill ID required" });

        const bill = await Bill.findByIdAndUpdate(
            id,
            { amount, status, paymentMethod },
            { new: true }
        );

        if (!bill) return res.status(404).json({ success: false, message: "Bill not found" });

        res.status(200).json({ success: true, bill });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

module.exports = { createBillFromBooking, ViewBill, getById, updateBill };
