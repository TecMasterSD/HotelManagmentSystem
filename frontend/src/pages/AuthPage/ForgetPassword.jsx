// src/pages/AuthPage/ForgotPassword.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ForgotPassword, ResetPassword, resetForgotPassword } from "../../ReducState/AuthState/AuthState";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, forgotPasswordSent, passwordReset } = useSelector((state) => state.auth);

  const [step, setStep] = useState(1); // Step 1: email, Step 2: OTP + new password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (forgotPasswordSent) {
      toast.success("OTP sent to your email!");
      setStep(2);
      dispatch(resetForgotPassword());
    }
    if (passwordReset) {
      toast.success("Password reset successfully!");
      navigate("/auth/login");
      dispatch(resetForgotPassword());
    }
    if (error) {
      toast.error(error);
    }
  }, [forgotPasswordSent, passwordReset, error, navigate, dispatch]);

  const handleRequestOtp = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    dispatch(ForgotPassword({ email }));
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!otp || !newPassword) {
      toast.error("Please enter OTP and new password");
      return;
    }
    dispatch(ResetPassword({ email, otp, newPassword }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F1717] p-4">
      <div className="w-full max-w-md bg-white/10 p-8 border border-white/20 backdrop-blur-xl rounded-xl">
        {step === 1 && (
          <form onSubmit={handleRequestOtp} className="space-y-6">
            <h2 className="text-center text-[#D4AF37] text-2xl uppercase tracking-widest">Forgot Password</h2>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-md text-black focus:outline-none"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#D4AF37] text-black py-3 uppercase tracking-widest disabled:opacity-50"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleResetPassword} className="space-y-6">
            <h2 className="text-center text-[#D4AF37] text-2xl uppercase tracking-widest">Reset Password</h2>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-3 rounded-md text-black focus:outline-none"
              required
            />
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-md text-black focus:outline-none"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#D4AF37] text-black py-3 uppercase tracking-widest disabled:opacity-50"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
