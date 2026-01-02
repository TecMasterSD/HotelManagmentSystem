// AdminSidebar.jsx
import React, { Fragment, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaBed,
  FaUsers,
  FaClipboardList,
  FaHistory,
  FaCog,
  FaSignOutAlt,
  FaMoneyBill,
  FaUserTie,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { Sheet, SheetContent, SheetHeader } from "../ui/sheet";

const AdminNavItem = ({ icon, label, to, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to} onClick={onClick}>
      <div
        className={`flex items-center gap-3 p-3 rounded-md cursor-pointer transition ${
          isActive
            ? "bg-[#D4AF37] text-black"
            : "text-white/70 hover:bg-white/10 hover:text-white"
        }`}
      >
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
  };

  return (
    <Fragment>
      {/* MOBILE HAMBURGER BUTTON */}
      <div className="md:hidden flex items-center p-4 bg-gray-900 text-white">
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-2xl focus:outline-none"
        >
          <FaBars />
        </button>
        <h1 className="ml-4 text-xl font-bold text-[#D4AF37]">The Oasis</h1>
      </div>

      {/* MOBILE SIDEBAR */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent
          side="left"
          className="flex flex-col h-full p-4 bg-gray-900 text-white w-64"
        >
          <SheetHeader>
            <div className="mb-8 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-[#D4AF37]">The Oasis</h1>
                <p className="text-xs tracking-widest text-white/50">ADMIN PANEL</p>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="text-xl">
                <FaTimes />
              </button>
            </div>
          </SheetHeader>

          <nav className="flex-1 space-y-2">
            <AdminNavItem icon={<FaHome />} label="Dashboard" to="/admin/dashboard" onClick={() => setSidebarOpen(false)} />
            <AdminNavItem icon={<FaBed />} label="Rooms" to="/admin/rooms/view" onClick={() => setSidebarOpen(false)} />
            <AdminNavItem icon={<FaUsers />} label="Users" to="/admin/users/view" onClick={() => setSidebarOpen(false)} />
            <AdminNavItem icon={<FaUserTie />} label="Staff" to="/admin/staff/view" onClick={() => setSidebarOpen(false)} />
            <AdminNavItem icon={<FaClipboardList />} label="Bookings" to="/admin/bookings/view" onClick={() => setSidebarOpen(false)} />
            <AdminNavItem icon={<FaMoneyBill />} label="Billing" to="/admin/billing/view" onClick={() => setSidebarOpen(false)} />
            <AdminNavItem icon={<FaHistory />} label="Logs" to="/admin/logs" onClick={() => setSidebarOpen(false)} />
            <AdminNavItem icon={<FaCog />} label="Settings" to="/admin/settings" onClick={() => setSidebarOpen(false)} />
          </nav>

          <button
            onClick={logoutHandler}
            className="mt-auto flex items-center gap-2 text-red-400 hover:text-red-300 px-3 py-2 rounded-md"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </SheetContent>
      </Sheet>

      {/* DESKTOP SIDEBAR */}
      <div className="hidden md:flex flex-col h-full p-4 bg-gray-900 text-white min-h-screen w-64">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#D4AF37]">The Oasis</h1>
          <p className="text-xs tracking-widest text-white/50">ADMIN PANEL</p>
        </div>

        <nav className="flex-1 space-y-2">
          <AdminNavItem icon={<FaHome />} label="Dashboard" to="/admin/dashboard" />
          <AdminNavItem icon={<FaBed />} label="Rooms" to="/admin/rooms/view" />
          <AdminNavItem icon={<FaUsers />} label="Users" to="/admin/users/view" />
          <AdminNavItem icon={<FaUserTie />} label="Staff" to="/admin/staff/view" />
          <AdminNavItem icon={<FaClipboardList />} label="Bookings" to="/admin/bookings/view" />
          <AdminNavItem icon={<FaMoneyBill />} label="Billing" to="/admin/billing/view" />
          <AdminNavItem icon={<FaHistory />} label="Logs" to="/admin/logs" />
          <AdminNavItem icon={<FaCog />} label="Settings" to="/admin/settings" />
        </nav>

        <button
          onClick={logoutHandler}
          className="mt-auto flex items-center gap-2 text-red-400 hover:text-red-300 px-3 py-2 rounded-md"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </Fragment>
  );
};

export default Sidebar;
