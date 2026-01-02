// AdminHeader.jsx
import React from "react";
import { FaBell, FaUserCircle, FaSignOutAlt, FaBars, FaHamburger, } from "react-icons/fa";
import { Hamburger } from "lucide-react"
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminHeader = ({
  title = "Dashboard",
  subtitle = "Hotel Overview",
  openSideBar
}) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        {
          withCredentials: true, // 🔴 important if token is in cookie
        }
      );

      // localStorage / redux clear (if used)
      localStorage.removeItem("token");

      navigate("/auth/login");

      return response.data;
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };


  return (
    <header className="w-full mb-4 px-3 sm:px-5 py-3 sm:py-4 bg-black/20 backdrop-blur-md border border-white/5 rounded-md shadow-xl">
      <div className="flex items-center justify-between gap-3">

        {/* LEFT SECTION */}
        <div className="flex items-center gap-3 min-w-0">


          {/* TITLE */}
          <div className="">
            <button className="bg-none cursor-pointer md:hidden block" onClick={() => openSideBar(true)}><Hamburger /></button>
          </div>
          <div className="min-w-0">
            <h2 className="text-base sm:text-xl font-serif font-bold text-white truncate">
              {title}
            </h2>
            <p className="text-[9px] sm:text-xs uppercase tracking-widest text-white/40 truncate">
              {subtitle}
            </p>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-2 sm:gap-4">

          {/* NOTIFICATION */}
          <button className="relative text-white/60 hover:text-[#D4AF37]">
            <FaBell size={16} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#D4AF37] rounded-full"></span>
          </button>

          {/* PROFILE */}
          <div className="flex items-center gap-2 px-2 sm:px-3 py-2 bg-white/5 hover:bg-white/10 rounded-md">
            <FaUserCircle size={20} className="text-[#D4AF37]" />
            <div className="leading-tight hidden md:block">
              <p className="text-xs font-semibold text-white">Admin</p>
              <p className="text-[10px] text-white/40">Administrator</p>
            </div>
          </div>

          {/* LOGOUT */}
          <button
            onClick={logoutHandler}
            className="flex items-center gap-1 text-red-400 hover:text-red-300 text-[10px] sm:text-[11px] font-bold uppercase"
          >
            <FaSignOutAlt size={14} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
