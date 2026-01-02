const StaffModel = require('../Models/staffModel');

// ================= CREATE STAFF =================
const CreateStaff = async (req, res) => {
    try {
        const { staffId, staffshift, staffstatus, joiningDate } = req.body;

        if (!staffId || !staffshift || !staffstatus) {
            return res.status(400).json({
                success: false,
                message: "Staff ID, shift and status are required"
            });
        }

        const existingStaff = await StaffModel.findOne({ staffId });
        if (existingStaff) {
            return res.status(400).json({
                success: false,
                message: "Staff profile already exists"
            });
        }

        let formattedDate = Date.now();
        if (joiningDate) {
            const [day, month, year] = joiningDate.split("-");
            formattedDate = new Date(`${year}-${month}-${day}`);
        }

        const newStaff = new StaffModel({
            staffId,
            staffshift,
            staffstatus,
            joiningDate: formattedDate
        });

        await newStaff.save();

        res.status(201).json({
            success: true,
            message: "Staff Profile Created Successfully",
            staff: newStaff
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// ================= VIEW STAFF =================
const viewStaff = async (req, res) => {
    try {
        const staffList = await StaffModel.find();
        res.status(200).json({
            success: true,
            total: staffList.length,
            staff: staffList
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// ================= UPDATE STAFF =================
const updateStaff = async (req, res) => {
    try {
        const { id } = req.params;
        const { staffshift, staffstatus, joiningDate } = req.body;

        const staff = await StaffModel.findById(id);
        if (!staff) {
            return res.status(404).json({
                success: false,
                message: "Staff not found"
            });
        }

        if (staffshift) staff.staffshift = staffshift;
        if (staffstatus) staff.staffstatus = staffstatus;
        if (joiningDate) {
            const [day, month, year] = joiningDate.split("-");
            staff.joiningDate = new Date(`${year}-${month}-${day}`);
        }

        await staff.save();

        res.status(200).json({
            success: true,
            message: "Staff updated successfully",
            staff
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// ================= DELETE STAFF =================
const deleteStaff = async (req, res) => {
    try {
        const { id } = req.params;

        const staff = await StaffModel.findById(id);
        if (!staff) {
            return res.status(404).json({
                success: false,
                message: "Staff not found"
            });
        }

        await StaffModel.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Staff deleted successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

module.exports = { CreateStaff, viewStaff, updateStaff, deleteStaff };
