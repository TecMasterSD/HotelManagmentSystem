const RoomModel = require("../Models/RoomModel");

// Add Room
const addRoom = async (req, res) => {
  try {
    const { RoomNumber, type, Price, Status, assignedStaff } = req.body;

    let assignedStaffParsed = [];
    if (assignedStaff) {
      try { assignedStaffParsed = JSON.parse(assignedStaff); } 
      catch(e){ assignedStaffParsed = []; }
    }

    const image = req.file ? `uploads/rooms/${req.file.filename}` : null;

    if (!RoomNumber || !type || !Price || !Status) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const roomExists = await RoomModel.findOne({ RoomNumber });
    if (roomExists) return res.status(400).json({ success: false, message: "Room already exists" });

    const newRoom = new RoomModel({ RoomNumber, type, Price, Status, assignedStaff: assignedStaffParsed, image });
    await newRoom.save();

    res.status(201).json({ success: true, room: newRoom });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// View Rooms
const viewRooms = async (req, res) => {
  try {
    const rooms = await RoomModel.find().populate("assignedStaff.staffId", "staffshift staffstatus");
    res.status(200).json({ success: true, data: rooms });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Update Room
const updateRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const { RoomNumber, type, Price, Status, assignedStaff } = req.body;

    let assignedStaffParsed = [];
    if (assignedStaff) {
      try { assignedStaffParsed = JSON.parse(assignedStaff); } 
      catch(e){ assignedStaffParsed = []; }
    }

    const room = await RoomModel.findById(id);
    if (!room) return res.status(404).json({ success: false, message: "Room not found" });

    room.RoomNumber = RoomNumber || room.RoomNumber;
    room.type = type || room.type;
    room.Price = Price || room.Price;
    room.Status = Status || room.Status;
    room.assignedStaff = assignedStaffParsed.length ? assignedStaffParsed : room.assignedStaff;

    if (req.file) room.image = `uploads/rooms/${req.file.filename}`;

    await room.save();
    res.status(200).json({ success: true, room });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Delete Room
const deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const room = await RoomModel.findById(id);
    if (!room) return res.status(404).json({ success: false, message: "Room not found" });

    await room.deleteOne();
    res.status(200).json({ success: true, message: "Room deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = { addRoom, viewRooms, updateRoom, deleteRoom };
