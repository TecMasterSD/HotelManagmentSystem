const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    comment: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
    },
  },
  {
    timestamps: true,
  }
);

/* 🛡️ Prevent duplicate feedback (same user + same room) */
feedbackSchema.index({ user: 1, room: 1 }, { unique: true });

const Feedback = mongoose.models.Feedback || mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
