import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateBilling } from "../../../ReducState/Bills/BillingState";
import axios from "axios";
import { toast } from "sonner";

const BillingUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({ amount: "", status: "", paymentMethod: "", services: [] });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/bill/getid/${id}`)
      .then(res => setForm({ amount: res.data.bill.amount, status: res.data.bill.status, paymentMethod: res.data.bill.paymentMethod , services : res?.data?.bill?.services}))
      .catch(err => toast.error(err.response?.data?.message || "Failed to fetch"));
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(updateBilling({ id, data: form }))
      .unwrap()
      .then(() => { toast.success("Bill updated"); navigate("/admin/billing/view"); })
      .catch(err => toast.error(err.message || "Update failed"));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Update Billing</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        {
            form && form.services.length != 0 ?
            <ul>
                {
                    form.services.map((ser, i) => (
                    <li key={ser?._id}>
                        <div className="flex gap-2">
                            <p>{ser?.name}</p>
                            <p>{ser?.price}</p>
                        </div>
                    </li>
                    )) 
                }
            </ul>
            : "No servcies included"
        }
        <input type="number" name="amount" value={form.amount} onChange={handleChange} placeholder="Amount" className="border p-2 w-full" required />
        <select name="status" value={form.status} onChange={handleChange} className="border p-2 w-full">
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
        </select>
        <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange} className="border p-2 w-full">
          <option value="cash">Cash</option>
          <option value="card">Card</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  );
};

export default BillingUpdate;
