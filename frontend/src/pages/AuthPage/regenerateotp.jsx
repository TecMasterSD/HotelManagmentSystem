import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { VerifyOtp, ResendOtp as ResendOtpThunk } from "../../ReduxState/AuthState/AuthStates";
import { toast } from "sonner";

const ResendOtp = () => {
  const [otp, setOtp] = useState("");
  const [resendLoading, setResendLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading } = useSelector((state) => state.auth);
  const email = location.state?.email;

  if (!email) {
    navigate("/auth/signup");
    return null;
  }

  const handleVerifyOtp = (e) => {
    e.preventDefault();

    if (otp.length !== 4) {
      toast.error("Please enter 4 digit OTP");
      return;
    }

    dispatch(VerifyOtp({ email, otp }))
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
    setResendLoading(true);

    dispatch(ResendOtpThunk({ email }))
      .unwrap()
      .then(() => {
        toast.success("OTP resent successfully!");
      })
      .catch((err) => {
        toast.error(err || "Failed to resend OTP");
      })
      .finally(() => setResendLoading(false));
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
            disabled={loading}
            className="w-full bg-[#D4AF37] text-black py-4 tracking-[0.3em] uppercase disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={handleResendOtp}
            disabled={resendLoading}
            className="text-[#D4AF37] underline disabled:opacity-50"
          >
            {resendLoading ? "Resending..." : "Resend OTP"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResendOtp;
