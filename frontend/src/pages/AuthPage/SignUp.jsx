import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RegisterUser } from "../../ReducState/AuthState/AuthState";
import { toast } from "sonner";
import signupImage from "../../assets/signup1.jpg";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    useremail: "",
    userpassword: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(RegisterUser(formData))
      .unwrap()
      .then((res) => {
        // console.log(res.success);
        if (res?.success) {
          toast.success(res.message || "Registered Successfully");
          navigate("/auth/otp-verify", {
            state: { email: formData.useremail },
          });
        }else{
          toast.error(res.message);
        }
      })
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0F1717]">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110 animate-[pulse_12s_infinite]"
        style={{ backgroundImage: `url(${signupImage})`, opacity: 0.35 }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F1717] via-transparent to-[#0F1717]/60"></div>

      <div className="relative z-10 w-full max-w-md px-6 my-10">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 md:p-12 shadow-2xl rounded-sm">

          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-[10px] tracking-[0.5em] uppercase text-[#D4AF37] font-bold mb-2">
              Join the Elite
            </h2>
            <h1 className="text-4xl font-serif text-white tracking-widest uppercase">
              Sign Up
            </h1>
            <div className="w-12 h-px bg-[#D4AF37] mx-auto mt-4"></div>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="FULL NAME"
              value={formData.username}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-white/20 py-3 text-white text-[11px] tracking-widest focus:outline-none focus:border-[#D4AF37] placeholder:text-white/30 uppercase"
              required
            />

            <input
              type="email"
              name="useremail"
              placeholder="EMAIL ADDRESS"
              value={formData.useremail}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-white/20 py-3 text-white text-[11px] tracking-widest focus:outline-none focus:border-[#D4AF37] placeholder:text-white/30 uppercase"
              required
            />

            <input
              type="password"
              name="userpassword"
              placeholder="PASSWORD"
              value={formData.userpassword}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-white/20 py-3 text-white text-[11px] tracking-widest focus:outline-none focus:border-[#D4AF37] placeholder:text-white/30 uppercase"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#D4AF37] text-[#0F1717] font-bold py-4 mt-4 tracking-[0.3em] text-[10px] uppercase hover:bg-white transition-all duration-500 shadow-lg disabled:opacity-50"
            >
              {loading ? "Processing..." : "Begin Your Journey"}
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-8 text-center text-white/60 text-[10px] tracking-[0.2em] uppercase">
            Already a Member?
            <Link
              to="/login"
              className="text-[#D4AF37] font-bold hover:underline ml-1"
            >
              Login Here
            </Link>
          </p>
        </div>

        {/* Back Home */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-white/30 text-[10px] tracking-[0.4em] hover:text-[#D4AF37] transition-colors uppercase"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
