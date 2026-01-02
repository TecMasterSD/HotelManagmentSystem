import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchBillings } from "../../../ReducState/Bills/BillingState";
import { toast } from "sonner";

const BillingView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux se billing data
  const { billings } = useSelector((state) => state.billing);

  useEffect(() => {
    dispatch(fetchBillings());
  }, [dispatch]);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* Header with Create Bill button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Billing List</h2>
        <button
          onClick={() => navigate("/admin/billing/create")}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Create Bill
        </button>
      </div>

      {/* Billing Table */}
      <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-x-auto shadow-lg">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-gray-700 text-white text-sm uppercase">
              <th className="px-4 py-2 border border-gray-600">Booking ID</th>
              <th className="px-4 py-2 border border-gray-600">Guest ID</th>
              <th className="px-4 py-2 border border-gray-600">Room ID</th>
              <th className="px-4 py-2 border border-gray-600">Per Day Price</th>
              <th className="px-4 py-2 border border-gray-600">Services</th>
              <th className="px-4 py-2 border border-gray-600">Total Amount</th>
              <th className="px-4 py-2 border border-gray-600 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {billings && billings.length > 0 ? (
              billings.map((bill, idx) => (
                <tr key={idx} className="bg-gray-800 text-white hover:bg-gray-700 transition">
                  <td className="px-4 py-2 border border-gray-600">{bill.bookingId}</td>
                  <td className="px-4 py-2 border border-gray-600">{bill.guestId}</td>
                  <td className="px-4 py-2 border border-gray-600">{bill.roomId}</td>
                  <td className="px-4 py-2 border border-gray-600">${bill.perDayPrice}</td>
                  <td className="px-4 py-2 border border-gray-600">
                    {bill.services && bill.services.length > 0
                      ? bill.services.map((s, i) => (
                          <div
                            key={i}
                            className="flex justify-between border-b border-gray-600 py-1"
                          >
                            <span>{s.name}</span>
                            <span>${s.price}</span>
                          </div>
                        ))
                      : "No services"}
                  </td>
                  <td className="px-4 py-2 border border-gray-600 font-bold text-green-400">
                    ${bill.totalAmount}
                  </td>
                  <td className="px-4 py-2 border border-gray-600 text-center">
                    <button
                      onClick={() =>
                        navigate("/admin/billing/create", {
                          state: {
                            id: bill.bookingId,
                            guestId: bill.guestId,
                            roomId: bill.roomId,
                            roomPrice: bill.perDayPrice,
                            checkInRaw: bill.checkIn,
                            checkOutRaw: bill.checkOut,
                          },
                        })
                      }
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
                    >
                      Edit / Update
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-white py-4">
                  No bills available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BillingView;
