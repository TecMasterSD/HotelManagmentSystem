const express = require("express");
const router = express.Router();
const { addRoom, viewRooms, updateRoom, deleteRoom } = require("../controllers/RoomController");
const upload = require("../middlewares/roomUpload"); // sirf yaha

router.post("/create", upload.single("image"), addRoom);
router.get("/view", viewRooms);
router.put("/update/:id", upload.single("image"), updateRoom);
router.delete("/delete/:id", deleteRoom);

module.exports = router;
