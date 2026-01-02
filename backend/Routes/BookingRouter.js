const express = require('express');
const router = express.Router();
const { roomBooking, viewAllBooking, bookingUpdate, bookingDelete, getBooking } = require('../controllers/BookintgController');

router.post('/create', roomBooking);
router.get('/view', viewAllBooking);
router.get('/:id', getBooking);
router.put('/:id/update', bookingUpdate);
router.delete('/:id/delete', bookingDelete);

module.exports = router;
