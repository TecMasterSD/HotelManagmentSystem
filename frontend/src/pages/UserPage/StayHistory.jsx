// src/pages/UserPage/StayHistory.jsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaCalendarCheck, FaHistory, FaTimes, FaSignOutAlt, FaHome } from "react-icons/fa";
import { fetchBooking } from "../../ReducState/BookingState/BookingState";
import { logout } from "../../ReducState/AuthState/AuthState";

const BACKEND_URL = "http://localhost:5000";

const StayHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { bookings = [], loading, error } = useSelector((state) => state.booking);

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Protect route & fetch bookings
  useEffect(() => {
    if (!user) navigate("/auth/login");
    else dispatch(fetchBooking());
  }, [user, dispatch, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login");
  };

  const getInitials = (name) =>
    name
      .split(" ")
      .map((x) => x[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const displayName = user?.username || user?.user?.username || "Member";

  // Filter past bookings
  const today = new Date();
  const pastBookings = bookings.filter((booking) => {
    const guestId = booking.guest?._id || booking.guest;
    const checkOutDate = new Date(booking.checkout);
    return guestId?.toString() === user?._id?.toString() && checkOutDate < today;
  });

  const getImageUrl = (image) => {
    if (!image) return null;
    if (image.startsWith("http") || image.startsWith("https")) return image;
    return `${BACKEND_URL}/${image}`;
  };

  return (
    <div className="py-17  min-h-screen flex bg-gradient-to-b from-[#0F1717] via-[#2a1e24] to-[#fce4ec]">
      {/* Overlay (mobile) */}
      {isSidebarOpen && <div className="fixed inset-0 bg-black/60 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col p-6 text-white transform transition-transform duration-300 md:relative md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-start mb-10">
          <div>
            <h2 className="text-2xl font-serif text-[#D4AF37]">The Oasis</h2>
            <p className="text-[11px] tracking-widest uppercase text-white/80 mt-1 font-bold italic">@{displayName}</p>
          </div>
          <button className="md:hidden text-white/80" onClick={() => setSidebarOpen(false)}>
            <FaTimes size={20} />
          </button>
        </div>

        <nav className="space-y-6 flex-1">
          {/* Added Home/Overview */}
          <NavItem icon={<FaHome />} label="Overview" to="/dashboard" />
          <NavItem icon={<FaCalendarCheck />} label="My Bookings" to="/dashboard/my-bookings" />
          <NavItem icon={<FaHistory />} label="Stay History" to="/dashboard/stay-history" active />
          <NavItem icon={<FaUser />} label="Profile Settings" to="/dashboard/profile" />
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-red-400 hover:text-red-300 text-sm font-bold uppercase tracking-widest mt-auto border-t border-white/10 pt-4"
        >
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-serif text-white text-center md:text-left">
              Stay History <span className="text-[#D4AF37]">{displayName}</span>
            </h1>
          </div>
          <button
            onClick={() => setSidebarOpen(true)}
            className="w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#0F1717] font-bold md:hidden"
          >
            {getInitials(displayName)}
          </button>
        </header>

        {/* Booking Cards */}
        {loading ? (
          <p className="text-white/70 text-center">Loading your past bookings...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : pastBookings.length === 0 ? (
          <p className="text-white/70 text-center">You have no past bookings.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {pastBookings.map((booking) => (
              <BookingCard key={booking._id} booking={booking} getImageUrl={getImageUrl} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

/* ---------------- Small Components ---------------- */
const NavItem = ({ icon, label, to = "#", active = false }) => (
  <Link
    to={to}
    className={`w-full flex items-center gap-4 p-2 rounded-md transition-all ${
      active ? "text-[#D4AF37] bg-white/10" : "text-white/60 hover:text-white hover:bg-white/5"
    }`}
  >
    <span className="text-lg">{icon}</span>
    <span className="text-sm font-medium tracking-wide">{label}</span>
  </Link>
);

const BookingCard = ({ booking, getImageUrl }) => (
  <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white/10 transition hover:scale-105 hover:shadow-3xl flex flex-col">
    {getImageUrl(booking.room?.image) ? (
      <img
        src={getImageUrl(booking.room.image)}
        alt={booking.room?.RoomNumber || booking.room?.name || "Room"}
        className="w-full h-48 object-cover rounded-xl mb-4"
      />
    ) : (
      <div className="w-full h-48 flex items-center justify-center bg-gray-300 rounded-xl mb-4">
        <span className="text-black text-xl font-bold text-center">
          {booking.room?.RoomNumber || booking.room?.name || "Room"}
        </span>
      </div>
    )}

    <div className="flex justify-between items-center mb-3">
      <h3 className="text-lg font-semibold text-white">
        Room: {booking.room?.RoomNumber || booking.room?.name || "N/A"}
      </h3>
      <span
        className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
          booking.status === "reserved"
            ? "bg-yellow-500/20 text-yellow-400"
            : booking.status === "checked-in"
            ? "bg-green-500/20 text-green-400"
            : "bg-red-500/20 text-red-400"
        }`}
      >
        {booking.status}
      </span>
    </div>

    <p className="text-white/70 text-sm mb-1">
      <span className="font-semibold">Check-In:</span> {new Date(booking.checkIn).toLocaleDateString()}
    </p>
    <p className="text-white/70 text-sm mb-1">
      <span className="font-semibold">Check-Out:</span> {new Date(booking.checkout).toLocaleDateString()}
    </p>
    <p className="text-white/70 text-sm">
      <span className="font-semibold">Guests:</span> {booking.guests || 1}
    </p>
  </div>
);

export default StayHistory;
