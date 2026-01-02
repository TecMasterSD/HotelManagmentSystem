import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaBed,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";
import Sidebar from "./SideBar";
import AdminHeader from "./AdminHeader";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, openSideBar] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your logout logic here
    navigate("/auth/login");
  };

  return (
    <div className="flex min-h-screen bg-[#0F1717] text-white">
      
      {/* SIDEBAR */}
      {/* <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-[#1A1A1A] transition-width duration-300`}
      >
        <div className="p-4 font-bold text-xl border-b border-white/10">
          Admin Panel
        </div>
        <nav className="mt-4 flex flex-col gap-2">
          <Link
            to="/admin"
            className="flex items-center gap-2 px-4 py-2 hover:bg-white/10 rounded"
          >
            <FaHome /> Dashboard
          </Link>
          <Link
            to="/admin/rooms/view"
            className="flex items-center gap-2 px-4 py-2 hover:bg-white/10 rounded"
          >
            <FaBed /> Rooms
          </Link>
          <Link
            to="/admin/users/view"
            className="flex items-center gap-2 px-4 py-2 hover:bg-white/10 rounded"
          >
            <FaUsers /> Users
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 hover:bg-white/10 rounded mt-auto w-full"
          >
            <FaSignOutAlt /> Logout
          </button>
        </nav>
      </div> */}
      <Sidebar sidebarOpen={sidebarOpen} openSideBar={openSideBar}/>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">
        {/* HEADER */}
      <AdminHeader openSideBar={openSideBar}/>
        {/* CHILDREN CONTENT */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
