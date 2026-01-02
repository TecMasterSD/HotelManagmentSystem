import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../../ReducState/AuthState/AuthState";
import { toast } from "sonner";
import signupImage from "../../assets/signup1.jpg";


const Login = () => {
  const [formData, setFormData] = useState({
    useremail: "",
    userpassword: "",
  });

  // const {user} = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, user, error } = useSelector((state) => state.auth);
  console.log("User", user)
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(LoginUser(formData))
      .unwrap()
      .then((res) => {
        // Check if backend returned user object
        if (res && res.user) {
          toast.success(res.message || "Login successful!");
          localStorage.setItem("token", res.user.token);
          console.log("After login",res.user)
          if(res.user && res.user != null){
            if(res.user.userrole === "admin"){
              navigate("/admin")
            }else{
              navigate("/");
            }
          }
        } else {
          toast.error(res.message || "Invalid email or password");
        }
      })
      .catch((err) => {
        toast.error(err || "Login failed!");
      });
  };

  // Show toast if Redux error exists
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0F1717]">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110 animate-[pulse_12s_infinite]"
        style={{ backgroundImage: `url(${signupImage})`, opacity: 0.35 }}
      ></div>
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 md:p-12 shadow-2xl rounded-sm">
          <div className="text-center mb-10">
            <h2 className="text-[10px] tracking-[0.5em] uppercase text-[#D4AF37] font-bold mb-2">
              Welcome Back
            </h2>
            <h1 className="text-4xl font-serif text-white tracking-widest uppercase">
              Login
            </h1>
            <div className="w-12 h-px bg-[#D4AF37] mx-auto mt-4"></div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              type="email"
              name="useremail"
              placeholder="EMAIL ADDRESS"
              value={formData.useremail}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-white/20 py-3 text-white text-[11px] tracking-widest focus:outline-none focus:border-[#D4AF37] transition-colors placeholder:text-white/30 uppercase"
              required
            />

            <input
              type="password"
              name="userpassword"
              placeholder="PASSWORD"
              value={formData.userpassword}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-white/20 py-3 text-white text-[11px] tracking-widest focus:outline-none focus:border-[#D4AF37] transition-colors placeholder:text-white/30 uppercase"
              required
            />

            <div className="flex justify-end">
              <Link to="/auth/forgot-password">
                <button
                  type="button"
                  className="text-[10px] text-[#D4AF37] tracking-widest hover:text-white transition-colors"
                >
                  FORGOT PASSWORD?
                </button>
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#D4AF37] text-[#0F1717] font-bold py-4 mt-4 tracking-[0.3em] text-[10px] uppercase hover:bg-white transition-all duration-500 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Processing..." : "Access Your Account"}
            </button>
          </form>

          <p className="mt-8 text-center text-white/60 text-[10px] tracking-[0.2em] uppercase">
            New to Luxe?{" "}
            <Link
              to="/auth/signup"
              className="text-[#D4AF37] font-bold hover:underline ml-1"
            >
              Create Account
            </Link>
          </p>
        </div>

        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-white/40 text-[10px] tracking-[0.4em] hover:text-[#D4AF37] transition-colors uppercase"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
