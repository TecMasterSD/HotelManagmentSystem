  require("dotenv").config(); 

  const express = require("express");
  const mongoose = require("mongoose");
  const cors = require("cors");
  const cookieParser = require("cookie-parser");
  const path = require("path");

  // Routes
  const AuthRouting = require("./Routes/AuthRoutes");
  const RoomRouter = require("./Routes/RoomRouter");
  const bookingRouter = require("./Routes/BookingRouter");
  const BillingRouter = require("./Routes/BillingRouter");
  const StaffRouter = require("./Routes/StaffRoutes");
  const feedbackRouter = require("./Routes/feedbackRoutes");

  const app = express();
  const port = process.env.PORT ;

  // ================= MIDDLEWARE =================
  app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
  }));
  app.use(cookieParser());
  app.use(express.json());

  // ================= STATIC =================
  app.use("/uploads", express.static(path.join(__dirname, "uploads")));

  // ================= ROUTES =================
  app.use("/api/auth", AuthRouting);
  app.use("/api/room", RoomRouter);
  app.use("/api/booking", bookingRouter);
  app.use("/api/bill", BillingRouter);
  app.use("/api/staff", StaffRouter);
  app.use("/api/feedback", feedbackRouter);

  // ================= DATABASE =================
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected Successfully"))
    .catch((err) => console.error("❌ Database Error:", err));

  // ================= SERVER =================
  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });
