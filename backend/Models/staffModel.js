const mongoose = require('mongoose');

const StaffSchema = new mongoose.Schema({
    staffId: { type: mongoose.Schema.Types.ObjectId, ref: "staff" },
    staffshift: {
        type: String,
        enum: ['morning', 'evening', 'night'],
        required: true
    },
    staffstatus: {
        type: String,
        enum: ['active', 'inactive'],
        required: true
    },
    joiningDate: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.models.staff || mongoose.model('staff', StaffSchema);
