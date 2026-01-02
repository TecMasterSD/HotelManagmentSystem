import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaBed,
  FaUsers,
  FaChartLine,
  FaConciergeBell,
  FaClipboardList,
} from "react-icons/fa";

import { fetchRooms } from "../../ReducState/RoomsState/RoomSlice";
import { fetchAllUsers } from "../../ReducState/AuthState/AuthState";
import { fetchBillings } from "../../ReducState/Bills/BillingState";
import { fetchBooking } from "../../ReducState/BookingState/BookingState";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");

  // REDUX STATES
  const { rooms = [] } = useSelector((state) => state.room || {});
  const { users = [] } = useSelector((state) => state.auth || {});
  const { billings = [] } = useSelector((state) => state.billing || {});
  const { bookings = [] } = useSelector((state) => state.booking || {});

  useEffect(() => {
    dispatch(fetchRooms());
    dispatch(fetchAllUsers());
    dispatch(fetchBillings());
    dispatch(fetchBooking());
  }, [dispatch]);

  // STATS
  const stats = [
    {
      title: "Total Revenue",
      value: `$${billings.reduce((s, b) => s + (b.amount || 0), 0)}`,
      icon: <FaChartLine className="text-emerald-400 text-xl" />,
      trend: "This month",
    },
    {
      title: "Occupancy",
      value: `${rooms.filter((r) => r.Status === "occupied").length}/${rooms.length}`,
      icon: <FaBed className="text-[#D4AF37] text-xl" />,
      trend: "Rooms occupied",
    },
    {
      title: "Guests",
      value: users.length,
      icon: <FaUsers className="text-blue-400 text-xl" />,
      trend: "Active users",
    },
    {
      title: "Pending Bills",
      value: billings.filter((b) => b.status === "pending").length,
      icon: <FaConciergeBell className="text-amber-400 text-xl" />,
      trend: "Payments",
    },
    {
      title: "Bookings",
      value: bookings.length,
      icon: <FaClipboardList className="text-purple-400 text-xl" />,
      trend: "Total",
    },
  ];

  // FILTER BOOKINGS
  const filteredBookings = bookings
    .map((b) => ({
      id: b._id,
      guest: b.guest?.username || "N/A",
      room: b.room?.RoomNumber || "-",
      status: b.status,
      checkIn: b.checkIn ? new Date(b.checkIn).toLocaleDateString() : "-",
      bill: billings.find((bill) => bill.booking === b._id)?.amount || 0,
    }))
    .filter((b) =>
      `${b.guest} ${b.room} ${b.status}`
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );

  return (
    <div className="space-y-6">

      {/* SEARCH */}
      <div className="w-full flex justify-center">
        <input
          type="text"
          placeholder="Search guest, room, status..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full sm:max-w-md px-4 py-2 rounded-md bg-black/20 border border-white/10 text-white placeholder-white/50 focus:outline-none"
        />
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-black/20 backdrop-blur-md border border-white/10 rounded-md p-4 flex flex-col gap-2"
          >
            <div className="flex justify-between items-center">
              <div className="p-2 bg-white/5 rounded">{stat.icon}</div>
              <span className="text-[10px] text-emerald-400 font-bold">LIVE</span>
            </div>
            <p className="text-[11px] text-white/40 uppercase">{stat.title}</p>
            <h3 className="text-xl sm:text-2xl font-bold text-white">{stat.value}</h3>
            <p className="text-[10px] text-white/30">{stat.trend}</p>
          </div>
        ))}
      </div>

      {/* BOOKINGS TABLE */}
      <div className="bg-white/5 border border-white/10 rounded-md overflow-x-auto">
        <table className="w-full min-w-[500px] text-left">
          <thead className="bg-white/5">
            <tr className="text-[11px] uppercase text-white/40">
              <th className="hidden sm:table-cell px-3 py-2">ID</th>
              <th className="px-3 py-2">Guest</th>
              <th className="hidden md:table-cell px-3 py-2">Room</th>
              <th className="px-3 py-2">Status</th>
              <th className="hidden lg:table-cell px-3 py-2">Bill</th>
              <th className="px-3 py-2 text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/10">
            {filteredBookings.length ? (
              filteredBookings.map((b) => (
                <tr key={b.id} className="hover:bg-white/5">
                  <td className="hidden sm:table-cell px-3 py-2 text-xs text-[#D4AF37]">{b.id}</td>
                  <td className="px-3 py-2">
                    <div className="font-medium text-white truncate max-w-[120px]">{b.guest}</div>
                    <div className="text-[10px] text-white/40">{b.checkIn}</div>
                  </td>
                  <td className="hidden md:table-cell px-3 py-2">{b.room}</td>
                  <td className="px-3 py-2">
                    <StatusBadge status={b.status} />
                  </td>
                  <td className="hidden lg:table-cell px-3 py-2 font-bold text-[#D4AF37]">${b.bill}</td>
                  <td className="px-3 py-2 text-right">
                    <button className="text-xs text-white/50 hover:text-white underline">Edit</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-4 text-center text-white/40">No data found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// STATUS BADGE
const StatusBadge = ({ status }) => {
  const map = {
    reserved: "bg-amber-500/10 text-amber-500",
    "checked-in": "bg-emerald-500/10 text-emerald-500",
    "checked-out": "bg-red-500/10 text-red-500",
  };

  return (
    <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded ${map[status] || "bg-gray-500/10 text-gray-400"}`}>
      {status}
    </span>
  );
};

export default AdminDashboard;
