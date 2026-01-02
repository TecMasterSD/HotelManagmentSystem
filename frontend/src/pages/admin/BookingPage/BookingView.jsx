import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooking } from "../../../ReducState/BookingState/BookingState";
import { useNavigate } from "react-router-dom";

const BookingView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { bookings = [], loading, error } = useSelector(
    (state) => state.booking || {}
  );

  useEffect(() => {
    dispatch(fetchBooking());
  }, [dispatch]);

  const handleCreateBill = (bookingId) => {
    navigate("/admin/billing/create", { state: { bookingId } });
  };

  const handleUpdateBill = (billId) => {
    navigate(`/admin/billing/update/${billId}`);
  };

  return (
    <div className="min-h-screen p-6 font-sans text-white">
      <div className="bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl rounded-md overflow-x-auto">

        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
          <h3 className="font-serif text-lg sm:text-xl">
            Current Booking Status
          </h3>
        </div>

        {/* States */}
        {loading && (
          <p className="p-4 text-sm text-white/60">Loading bookings...</p>
        )}
        {error && (
          <p className="p-4 text-sm text-red-400">{error}</p>
        )}

        {/* Table */}
        <table className="w-full text-left min-w-[900px]">
          <thead>
            <tr className="text-[9px] sm:text-[11px] uppercase tracking-[0.15em] text-white/40 border-b border-white/10">
              <th className="px-3 sm:px-6 py-3">Guest</th>
              <th className="px-3 sm:px-6 py-3">Room</th>
              <th className="px-3 sm:px-6 py-3">Check In</th>
              <th className="px-3 sm:px-6 py-3">Check Out</th>
              <th className="px-3 sm:px-6 py-3">Status</th>
              <th className="px-3 sm:px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5">
            {bookings.map((b) => (
              <tr
                key={b._id}
                className="hover:bg-white/5 transition-colors group"
              >
                <td className="px-3 sm:px-6 py-3">
                  <div className="font-medium">
                    {b.customerName}
                  </div>
                </td>

                <td className="px-3 sm:px-6 py-3 text-white/70">
                  {b.roomNumber}
                </td>

                <td className="px-3 sm:px-6 py-3 text-[11px] text-white/60">
                  {new Date(b.checkIn).toLocaleDateString()}
                </td>

                <td className="px-3 sm:px-6 py-3 text-[11px] text-white/60">
                  {new Date(b.checkOut).toLocaleDateString()}
                </td>

                <td className="px-3 sm:px-6 py-3">
                  <span
                    className={`px-2 py-1 text-[9px] uppercase tracking-wider rounded-sm font-bold
                      ${
                        b.status === "confirmed"
                          ? "bg-green-500/20 text-green-400"
                          : b.status === "cancelled"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                  >
                    {b.status}
                  </span>
                </td>

                <td className="px-3 sm:px-6 py-3 text-right flex gap-2 justify-end">
                  <button
                    onClick={() => handleCreateBill(b._id)}
                    className="text-[9px] sm:text-[10px] uppercase font-bold tracking-tight text-[#D4AF37] hover:underline"
                  >
                    Create Bill
                  </button>

                  {b.billId && (
                    <button
                      onClick={() => handleUpdateBill(b.billId)}
                      className="text-[9px] sm:text-[10px] uppercase font-bold tracking-tight text-blue-400 hover:underline"
                    >
                      Update Bill
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingView;
