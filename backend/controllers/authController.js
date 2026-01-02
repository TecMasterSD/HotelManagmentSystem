const User = require('../Models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const transportemail = require('../nodeMailer/index');

// ================= REGISTER ======================
const UserRegister = async (req, res) => {
    const { username, useremail, userpassword, selectedRole } = req.body;
    try {
        if (!username || !useremail || !userpassword) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const checkEmail = await User.findOne({ useremail });
        if (checkEmail) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(userpassword, 11);
        const randomOtp = Math.floor(1000 + Math.random() * 9000);

        const newUser = new User({
            username,
            useremail,
            userpassword: hashedPassword,
            otp: randomOtp.toString(),
            otpexpiretime: Date.now() + 3 * 60 * 1000, // 3 minutes
            isvrify: "pending",
            userrole: "user",
            selectedRole: selectedRole || ""
        });

        await newUser.save();

        // Send OTP via email
        transportemail.sendMail({
            from: "jawad17101khan@gmail.com",
            to: useremail,
            subject: "Email Verification Code",
            text: `Your OTP is: ${randomOtp}`
        });

        res.status(201).json({ success: true, message: "OTP sent to your email" });
    } catch (e) {
        console.log(e);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// ================= OTP VERIFY ======================
const otpVerification = async (req, res) => {
    const { useremail, otp } = req.body;
    try {
        const checkUser = await User.findOne({ useremail });
        console.log("OTP: ", otp)
        console.log("Users OTP: ", checkUser.otp)
        if (!checkUser) return res.status(404).json({ success: false, message: "User not found" });

        if (!checkUser.otpexpiretime || checkUser.otpexpiretime < Date.now()) {
            return res.status(400).json({ success: false, message: "OTP expired" });
        }
        if (checkUser.otp !== otp) {
            return res.status(400).json({ success: false, message: "Incorrect OTP" });
        }

        checkUser.otp = "";
        checkUser.otpexpiretime = null;
        checkUser.isvrify = "verified";
        await checkUser.save();

        res.status(200).json({ success: true, message: "User verified successfully" });
    } catch (e) {
        console.log(e);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// ================= LOGIN ======================
const LoginUser = async (req, res) => {
    const { useremail, userpassword } = req.body;
    try {
        const checkUser = await User.findOne({ useremail });
        if (!checkUser) return res.status(404).json({ success: false, message: "User not found" });

        const isMatch = await bcrypt.compare(userpassword, checkUser.userpassword);
        if (!isMatch) return res.status(401).json({ success: false, message: "Incorrect password" });

        if (checkUser.isvrify === "pending") {
            return res.status(403).json({ success: false, message: "Please verify your account first" });
        }

        const token = jwt.sign({ id: checkUser._id }, "CLIENT_SECRET_KEY", { expiresIn: "1h" });

        res.cookie("token", token, { httpOnly: true }).json({
            success: true,
            message: "Login successful",
            user: checkUser
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// ================= REGENERATE OTP ======================
const RegenerateOtp = async (req, res) => {
    const { useremail } = req.body;
    try {
        const checkUser = await User.findOne({ useremail });
        if (!checkUser) return res.status(404).json({ success: false, message: "User not found" });

        const newOtp = Math.floor(1000 + Math.random() * 9000);
        checkUser.otp = newOtp.toString();
        checkUser.otpexpiretime = Date.now() + 3 * 60 * 1000;
        await checkUser.save();

        transportemail.sendMail({
            from: "jawad17101khan@gmail.com",
            to: useremail,
            subject: "New OTP Code",
            text: `Your new OTP is: ${newOtp}`
        });

        res.status(200).json({ success: true, message: "New OTP sent to your email" });
    } catch (e) {
        console.log(e);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// ================= LOGOUT ======================
const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (e) {
        console.log(e);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// ================= GET ALL USERS ======================
const AcceptAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ success: true, users });
    } catch (e) {
        console.log(e);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// ================= ACCEPT USER REQUEST / UPDATE ROLE ======================
const acceptRequst = async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;
    try {
        const userToUpdate = await User.findById(id);
        if (!userToUpdate) return res.status(404).json({ success: false, message: "User not found" });

        userToUpdate.userrole = role || "user";
        await userToUpdate.save();

        res.status(200).json({ success: true, message: "User role updated", user: userToUpdate });
    } catch (e) {
        console.log(e);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// ================= GET USER BY ID ======================
const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const userFound = await User.findById(id);
        if (!userFound) return res.status(404).json({ success: false, message: "User not found" });

        res.status(200).json({ success: true, user: userFound });
    } catch (e) {
        console.log(e);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// ================= FORGOT PASSWORD ======================
const requestPasswordOtp = async (req, res) => {
    const { useremail } = req.body;
    try {
        const user = await User.findOne({ useremail });
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        const otp = Math.floor(1000 + Math.random() * 9000);
        user.otp = otp.toString();
        user.otpexpiretime = Date.now() + 3 * 60 * 1000;
        await user.save();

        transportemail.sendMail({
            from: "jawad17101khan@gmail.com",
            to: useremail,
            subject: "Password Reset OTP",
            text: `Your OTP is: ${otp}`
        });

        res.status(200).json({ success: true, message: "OTP sent to email" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// ================= RESET PASSWORD ======================
const resetPasswordWithOtp = async (req, res) => {
    const { useremail, otp, newPassword } = req.body;

    try {
        if (!newPassword) {
            return res.status(400).json({ success: false, message: "New password is required" });
        }

        const user = await User.findOne({ useremail });
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        if (!user.otpexpiretime || user.otpexpiretime < Date.now()) {
            return res.status(400).json({ success: false, message: "OTP expired" });
        }

        if (user.otp.toString() !== otp.toString()) {
            return res.status(400).json({ success: false, message: "Incorrect OTP" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 11);
        user.userpassword = hashedPassword;
        user.otp = "";
        user.otpexpiretime = null;

        await user.save();

        res.status(200).json({ success: true, message: "Password reset successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

module.exports = {
    UserRegister,
    LoginUser,
    otpVerification,
    RegenerateOtp,
    logoutUser,
    AcceptAllUsers,
    acceptRequst,
    getUserById,
    requestPasswordOtp,
    resetPasswordWithOtp
};
