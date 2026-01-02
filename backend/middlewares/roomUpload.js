const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure uploads/rooms folder exists
const uploadDir = path.join(__dirname, "../uploads/rooms");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// File filter (images only)
const upload = multer({
  storage,
  // limits: { fileSize: 5 * 1024 * 1024 },  // ✅ Remove size limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) cb(null, true);
    else cb(new Error("Only images are allowed (jpeg, jpg, png, webp)"));
  }
});

module.exports = upload;
