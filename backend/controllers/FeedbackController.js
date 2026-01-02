const mongoose = require("mongoose");
const Feedback = require("../Models/UserFeedback");
const Room = require("../Models/RoomModel");

/* ======================================
   CREATE FEEDBACK
====================================== */
exports.createFeedback = async (req, res) => {
  try {
    const { user, room, title, rating, comment } = req.body;

    // required fields
    if (!user || !room || !title || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // ObjectId validation
    if (
      !mongoose.Types.ObjectId.isValid(user) ||
      !mongoose.Types.ObjectId.isValid(room)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid user or room ID",
      });
    }

    // rating check
    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    // room exists check
    const roomData = await Room.findById(room);
    if (!roomData) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    // duplicate feedback check
    const alreadyExists = await Feedback.findOne({ user, room });
    if (alreadyExists) {
      return res.status(409).json({
        success: false,
        message: "You already submitted feedback for this room",
      });
    }

    // create feedback
    const feedback = await Feedback.create({
      user,
      room,
      title: title.trim(),
      rating,
      comment: comment.trim(),
    });

    return res.status(201).json({
      success: true,
      message: "Feedback submitted successfully",
      feedback,
    });
  } catch (error) {
    console.error("Create Feedback Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/* ======================================
   GET ALL FEEDBACKS (ADMIN / PUBLIC)
====================================== */
exports.getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate("user", "username userrole")
      .populate("room", "title")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: feedbacks.length,
      feedbacks,
    });
  } catch (error) {
    console.error("Get All Feedback Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/* ======================================
   GET FEEDBACK BY ROOM
====================================== */
exports.getFeedbackByRoom = async (req, res) => {
  try {
    const { roomId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(roomId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid room ID",
      });
    }

    const feedbacks = await Feedback.find({ room: roomId })
      .populate("user", "username userrole image")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: feedbacks.length,
      feedbacks,
    });
  } catch (error) {
    console.error("Get Feedback By Room Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/* ======================================
   DELETE FEEDBACK
====================================== */
exports.deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid feedback ID",
      });
    }

    const feedback = await Feedback.findById(id);
    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback not found",
      });
    }

    await feedback.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Feedback deleted successfully",
    });
  } catch (error) {
    console.error("Delete Feedback Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
