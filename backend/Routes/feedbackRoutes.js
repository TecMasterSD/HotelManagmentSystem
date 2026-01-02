const express = require("express");
const router = express.Router();

const {
  createFeedback,
  getAllFeedbacks,
  getFeedbackByRoom,
  deleteFeedback,
} = require("../controllers/FeedbackController");

/* =========================
   FEEDBACK ROUTES
========================= */

/* Create feedback */
router.post("/create", createFeedback);

/* Get all feedbacks (Admin) */
router.get("/", getAllFeedbacks);

/* Get feedback by room */
router.get("/room/:roomId", getFeedbackByRoom);

/* Delete feedback */
router.delete("/:id", deleteFeedback);

module.exports = router;
