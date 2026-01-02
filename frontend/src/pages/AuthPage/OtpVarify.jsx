import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { VerifyOtp, ResendOtp } from "../../ReducState/AuthState/AuthState";
import { toast } from "sonner";

const OtpVerify = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { verifyOtpLoading, resendOtpLoading } = useSelector((state) => state.auth);
  const email = location.state?.email;

  // Redirect if email not available
  useEffect(() => {
    if (!email) {
      navigate("/auth/signup");
    }
  }, [email, navigate]);

  const handleVerifyOtp = (e) => {
    e.preventDefault();

    if (otp.length !== 4) {
      toast.error("Please enter 4 digit OTP");
      return;
    }

    // Send OTP as number
    dispatch(VerifyOtp({ email, otp: Number(otp) }))
      .unwrap()
      .then(() => {
        toast.success("OTP Verified Successfully!");
        navigate("/auth/login");
      })
      .catch((err) => {
        toast.error(err || "OTP verification failed");
      });
  };

  const handleResendOtp = () => {
    dispatch(ResendOtp({ email }))
      .unwrap()
      .then(() => {
        toast.success("OTP resent successfully!");
      })
      .catch((err) => {
        toast.error(err || "Failed to resend OTP");
      });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0F1717]">
      <div className="w-full max-w-md bg-white/10 p-8 border border-white/20 backdrop-blur-xl">
        <h2 className="text-center text-[#D4AF37] text-xs tracking-[0.5em] uppercase">
          Verification
        </h2>
        <h1 className="text-center text-white text-3xl mt-2 uppercase tracking-widest">
          Enter OTP
        </h1>

        <p className="text-center text-white/50 text-xs mt-4 tracking-widest">
          OTP sent to <span className="text-[#D4AF37]">{email}</span>
        </p>

        <form onSubmit={handleVerifyOtp} className="mt-10 space-y-6">
          <input
            type="text"
            maxLength={4}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            placeholder="ENTER OTP"
            className="w-full text-center bg-transparent border-b border-white/20 py-4 text-white text-2xl tracking-[1em] focus:outline-none focus:border-[#D4AF37]"
            required
          />

          <button
            type="submit"
            disabled={verifyOtpLoading}
            className="w-full bg-[#D4AF37] text-black py-4 tracking-[0.3em] uppercase disabled:opacity-50"
          >
            {verifyOtpLoading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <p className="text-center text-white/50 text-xs mt-4">
          Didn't receive OTP?{" "}
          <button
            onClick={handleResendOtp}
            className="text-[#D4AF37] underline"
            disabled={resendOtpLoading}
          >
            {resendOtpLoading ? "Resending..." : "Resend OTP"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default OtpVerify;
