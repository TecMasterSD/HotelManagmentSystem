const express = require('express');
const router = express.Router();
const { createBillFromBooking, ViewBill, getById, updateBill } = require('../controllers/BillingController');

router.post('/from-booking', createBillFromBooking);  // create bill from booking
router.get('/view', ViewBill);                        // view all bills
router.get('/getid/:id', getById);                    // get bill by ID
router.put('/:id', updateBill);                       // update bill

module.exports = router;
