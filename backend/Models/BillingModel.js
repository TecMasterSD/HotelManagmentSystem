    const mongoose = require("mongoose");

    const BillingSchema = new mongoose.Schema({
        booking: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking",
            required: true
        },

        guest: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        room: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Room",
            required: true
        },

        amount: {
            type: Number,
            required: true
        },

    services: [
        {
            name: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }
    ]
    ,

        paymentMethod: {
            type: String,
            enum: ["cash", "card", "online"],
            default: "cash"
        },

        paid: {
            type: Boolean,
            default: false
        },

        status: {
            type: String,
            enum: ["pending", "paid"],
            default: "pending"
        },

        paymentDate: {
            type: Date
        }

    }, { timestamps: true });

const Billing = mongoose.models.Billing || mongoose.model("Billing", BillingSchema);

module.exports = Billing;