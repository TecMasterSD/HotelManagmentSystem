const mongoose = require("mongoose"); // ✅ add this

const RoomSchema = new mongoose.Schema({
  RoomNumber: { type: Number, required: true },
  type: { type: String, required: true },
  Price: { type: Number, required: true },
  Status: {
    type: String,
    enum: ["available", "occupied", "cleaning", "maintenance"],
    default: "available",
  },
  image: { type: String },
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true }, // add hotel field
  assignedStaff: [
    {
      staffId: { type: mongoose.Schema.Types.ObjectId, ref: "staff" },
      shift: { type: String, enum: ["morning", "evening", "night"], required: true },
    },
  ],
}, { timestamps: true });

const Room = mongoose.models.Room || mongoose.model("Room", RoomSchema);
module.exports = Room;

