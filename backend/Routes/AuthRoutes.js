const express = require('express');
const router = express.Router();

const {
    UserRegister,
    LoginUser,
    otpVerification,
    RegenerateOtp,
    logoutUser,
    AcceptAllUsers,
    acceptRequst,
    getUserById,
    requestPasswordOtp,      // Forgot password OTP
    resetPasswordWithOtp     // Reset password
} = require('../controllers/authController');
const {AuthMiddleware} = require('../middlewares/authMiddleware')

// ================= AUTH ROUTES =================
router.post("/register", UserRegister);
router.post("/login", LoginUser);
router.post("/verify-otp", otpVerification);
router.post("/regenerate-otp", RegenerateOtp);
router.post("/logout", logoutUser);

// ================= USER MANAGEMENT =================
router.get('/alluser', AcceptAllUsers);
router.put('/fetch/:id', acceptRequst);
router.get('/getuser/:id', getUserById);

router.get('/checkUser', AuthMiddleware, async(req, res) => {
    const user = req.user;
    return res.status(200).json({
        success: true,
        user
    })
})

// ================= PASSWORD RESET =================
router.post("/forgot-password", requestPasswordOtp);
router.post("/reset-password", resetPasswordWithOtp);

module.exports = router;
