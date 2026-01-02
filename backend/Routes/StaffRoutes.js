const express = require('express');
const router = express.Router();
const { CreateStaff, viewStaff, updateStaff, deleteStaff } = require('../controllers/staffController');

// Create a staff
router.post('/', CreateStaff);

// View all staff
router.get('/view', viewStaff);

// Update staff by ID
router.put('/:id', updateStaff);

// Delete staff by ID
router.delete('/:id', deleteStaff);

module.exports = router;
