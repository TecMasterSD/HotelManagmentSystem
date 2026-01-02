import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaCalendarCheck, FaCreditCard, FaSignOutAlt, FaHome, FaHistory, FaTimes } from "react-icons/fa";
import { logout } from "../../ReducState/AuthState/AuthState";
import { fetchBooking } from "../../ReducState/BookingState/BookingState";
import axios from "axios";

const BACKEND_URL = "http://localhost:5000";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { bookings = [], loading } = useSelector((state) => state.booking);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const displayName = user?.username || user?.user?.username || "Member";

  useEffect(() => {
    if (!user) navigate("/auth/login");
    else dispatch(fetchBooking());
  }, [user, dispatch, navigate]);

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

  const getInitials = (name) =>
    name.split(" ").map((x) => x[0]).join("").toUpperCase().slice(0, 2);

  const userBookings = bookings.filter((b) => b.guest?._id?.toString() === user?._id?.toString());
  const totalStays = userBookings.length;

  // ✅ Calculate discount for StatCard
  const hasDiscount = userBookings.some((b) => b.discountPercent > 0);
  const discountPercent = hasDiscount ? Math.max(...userBookings.map((b) => b.discountPercent || 0)) : 0;
  console.log(userBookings)

  return (
    <div className="py-18 min-h-screen flex bg-gradient-to-b from-[#0F1717] via-[#2a1e24] to-[#fce4ec]">
      {isSidebarOpen && <div className="fixed inset-0 bg-black/60 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col p-6 text-white transform transition-transform duration-300 md:relative md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex justify-between items-start mb-10">
          <div>
            <h2 className="text-2xl font-serif text-[#D4AF37]">The Oasis</h2>
            <p className="text-[11px] tracking-widest uppercase text-white/80 mt-1 font-bold italic">@{displayName}</p>
          </div>
          <button className="md:hidden text-white/80" onClick={() => setSidebarOpen(false)}><FaTimes size={20} /></button>
        </div>

        <nav className="space-y-6 flex-1">
          <NavItem icon={<FaHome />} label="Overview" to="/dashboard" active />
          <NavItem icon={<FaCalendarCheck />} label="My Bookings" to="/dashboard/my-bookings" />
          <NavItem icon={<FaHistory />} label="Stay History" to="/dashboard/stay-history" />
          <NavItem icon={<FaUser />} label="Profile Settings" to="/dashboard/profile" />
        </nav>

        <button onClick={handleLogout} className="flex items-center gap-3 text-red-400 hover:text-red-300 text-sm font-bold uppercase tracking-widest mt-auto border-t border-white/10 pt-4">
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-2xl md:text-4xl font-serif text-white">
              Welcome back, <span className="text-[#D4AF37]">{displayName}</span>
            </h1>
            <p className="text-gray-400 text-sm mt-1">{user?.email || user?.user?.email}</p>
          </div>
          <button onClick={() => setSidebarOpen(true)} className="w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#0F1717] font-bold md:hidden">
            {getInitials(displayName)}
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard title="Account Role" value={user?.userrole || user?.user?.userrole || "User"} icon={<FaUser />} />
          <StatCard title="Total Stays" value={totalStays} icon={<FaHome />} />
          <StatCard title="Discount" value={`${discountPercent}%`} icon={<FaCreditCard />} />
        </div>

        <div className="space-y-6">
          {loading ? (
            <p className="text-white/70">Loading your bookings...</p>
          ) : userBookings.length === 0 ? (
            <p className="text-white/70">You have no bookings yet.</p>
          ) : (
            userBookings.map((booking) => (
              <BookingCard key={booking._id} booking={booking} backendUrl={BACKEND_URL} />
            ))
          )}
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, to = "#", active = false }) => (
  <Link to={to} className={`w-full flex items-center gap-4 p-2 rounded-md transition-all ${active ? "text-[#D4AF37] bg-white/10" : "text-white/60 hover:text-white hover:bg-white/5"}`}>
    <span className="text-lg">{icon}</span>
    <span className="text-sm font-medium tracking-wide">{label}</span>
  </Link>
);

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white/5 backdrop-blur-md p-6 border border-white/10 rounded-2xl shadow-2xl flex items-center justify-between transition-transform hover:scale-105">
    <div>
      <p className="text-white/50 text-xs uppercase tracking-widest mb-2">{title}</p>
      <h4 className="text-2xl font-bold text-white font-serif">{value}</h4>
    </div>
    <div className="text-3xl text-[#D4AF37] opacity-90">{icon}</div>
  </div>
);

const BookingCard = ({ booking, backendUrl }) => {
  const pricePerNight = booking.room?.Price || 0;
  const checkInDate = new Date(booking.checkIn);
  const checkOutDate = new Date(booking.checkout);
  const totalNights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
  const totalPrice = pricePerNight * totalNights;
  const discountPercent = booking.discountPercent || 0;
  const discountAmount = (totalPrice * discountPercent) / 100;
  const finalPrice = totalPrice - discountAmount;

  return (
    <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center gap-6 transition-transform hover:scale-105">
      {booking.room?.image ? (
        <img src={`${backendUrl}/${booking.room.image}`} alt={`Room ${booking.room?.RoomNumber}`} className="w-full md:w-32 h-32 object-cover rounded-xl" />
      ) : (
        <div className="w-full md:w-32 h-32 flex items-center justify-center bg-gray-300 rounded-xl">
          <span className="text-black font-bold">{booking.room?.RoomNumber || booking.room?.name || "Room"}</span>
        </div>
      )}

      <div className="flex-1 text-white space-y-1">
        <p className="font-semibold text-lg">Room {booking.room?.RoomNumber}</p>
        <p>Check-In: {checkInDate.toLocaleDateString()}</p>
        <p>Check-Out: {checkOutDate.toLocaleDateString()}</p>
        <p>Total Nights: {totalNights}</p>
        <p>Guests: {booking.guests || 1}</p>
        <p>Status: <span className={`capitalize font-bold px-2 py-1 rounded-full text-xs ${booking.status === "reserved" ? "bg-yellow-500/20 text-yellow-400" : booking.status === "checked-in" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>{booking.status || "confirmed"}</span></p>
        <p>Price per Night: Rs {pricePerNight}</p>
        {discountPercent > 0 && <p className="text-green-400">Discount ({discountPercent}%): -Rs {discountAmount}</p>}
        <p className="font-bold text-[#D4AF37]">Total Amount: Rs {finalPrice}</p>
      </div>
    </div>
  );
};

export default UserDashboard;
