import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBilling } from "../../../ReducState/Bills/BillingState";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

const BillingCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [form, setForm] = useState({
    bookingId: state?.id || "",
    guestId: state?.guestId || "",
    roomId: state?.roomId || "",
    perDayPrice: state?.roomPrice || 0,
    services: [],
    totalAmount: 0,
    paymentMethod: "cash",
    checkIn: state?.checkInRaw || "",
    checkOut: state?.checkOutRaw || "",
  });

  const [serviceInput, setServiceInput] = useState({ name: "", price: "" });

  // ADD SERVICE
  const addService = () => {
    if (!serviceInput.name || !serviceInput.price) {
      return toast.error("Service name & price required");
    }
    setForm((p) => ({
      ...p,
      services: [...p.services, { ...serviceInput, price: Number(serviceInput.price) }],
    }));
    setServiceInput({ name: "", price: "" });
  };

  // REMOVE SERVICE
  const removeService = (i) => {
    setForm((p) => ({
      ...p,
      services: p.services.filter((_, idx) => idx !== i),
    }));
  };

  // CALCULATE TOTAL
  useEffect(() => {
    const perDay = Number(form.perDayPrice) || 0;
    const servicesTotal = form.services.reduce((s, x) => s + Number(x.price), 0);

    let days = 1;
    if (form.checkIn && form.checkOut) {
      const diff = new Date(form.checkOut) - new Date(form.checkIn);
      days = Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    }

    const total = perDay * days + servicesTotal;
    if (total !== form.totalAmount) {
      setForm((p) => ({ ...p, totalAmount: total }));
    }
  }, [form.perDayPrice, form.services, form.checkIn, form.checkOut]);

  // SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createBilling(form))
      .unwrap()
      .then(() => {
        toast.success("Bill Created");
        navigate("/admin/billing/view");
      })
      .catch(() => toast.error("Billing Failed"));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 shadow-2xl rounded-2xl w-full max-w-lg p-8 space-y-6 border border-gray-700">
        <h2 className="text-3xl font-bold text-center text-white mb-4">Create Billing</h2>
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Booking ID */}
          <input
            readOnly
            value={form.bookingId}
            placeholder="Booking ID"
            className="w-full p-3 rounded-lg bg-gray-200 text-gray-800 font-semibold focus:outline-none focus:ring-2 focus:ring-gray-400"
          />

          {/* Room Price */}
          <input
            readOnly
            value={form.perDayPrice}
            placeholder="Per Day Room Price"
            className="w-full p-3 rounded-lg bg-gray-200 text-gray-800 font-semibold focus:outline-none focus:ring-2 focus:ring-gray-400"
          />

          {/* Booking Days */}
          <input
            readOnly
            value={
              form.checkIn && form.checkOut
                ? Math.max(
                    1,
                    Math.ceil(
                      (new Date(form.checkOut) - new Date(form.checkIn)) /
                        (1000 * 60 * 60 * 24)
                    )
                  )
                : 1
            }
            placeholder="Booking Days"
            className=""
          />

          {/* Services */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold text-lg">Add Services</h3>
            <input
              placeholder="Service Name"
              value={serviceInput.name}
              onChange={(e) =>
                setServiceInput((p) => ({ ...p, name: e.target.value }))
              }
              className="w-full p-3 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <input
              type="number"
              placeholder="Service Price"
              value={serviceInput.price}
              onChange={(e) =>
                setServiceInput((p) => ({ ...p, price: e.target.value }))
              }
              className="w-full p-3 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <button
              type="button"
              onClick={addService}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg transition"
            >
              Add Service
            </button>

            {/* List Services */}
            {form.services.length > 0 && (
              <div className="bg-gray-700 p-3 rounded-lg space-y-2 border border-gray-600">
                {form.services.map((s, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center bg-gray-600 p-2 rounded"
                  >
                    <span className="text-white font-medium">{s.name} - ${s.price}</span>
                    <button
                      type="button"
                      onClick={() => removeService(i)}
                      className="text-red-500 font-bold hover:text-red-700 transition"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Total Amount */}
          <input
            readOnly
            value={form.totalAmount}
            placeholder="Total Amount (Room + Services)"
            className="w-full p-3 rounded-lg bg-green-100 text-green-800 font-bold focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          {/* Payment Method */}
          <select
            name="paymentMethod"
            value={form.paymentMethod}
            onChange={(e) =>
              setForm((p) => ({ ...p, paymentMethod: e.target.value }))
            }
            className="w-full p-3 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            <option value="cash">Cash</option>
            <option value="card">Card</option>
            <option value="online">Online</option>
          </select>

          {/* Submit Button */}
          <button className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition">
            Create Bill
          </button>
        </form>
      </div>
    </div>
  );
};

export default BillingCreate;
