// StaffPage.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStaff, createStaff, updateStaff, deleteStaff } from "../../../ReducState/staffState/staffSlice";

const StaffPage = () => {
  const dispatch = useDispatch();
  const { staffList = [], loading, error } = useSelector((state) => state.staff || {});

  const [formData, setFormData] = useState({ staffId: "", staffshift: "", staffstatus: "", joiningDate: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => { dispatch(fetchStaff()); }, [dispatch]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      dispatch(updateStaff({ id: editingId, staffData: formData }));
      setEditingId(null);
    } else {
      dispatch(createStaff(formData));
    }
    setFormData({ staffId: "", staffshift: "", staffstatus: "", joiningDate: "" });
  };

  const handleEdit = (staff) => {
    setEditingId(staff._id);
    setFormData({
      staffId: staff.staffId,
      staffshift: staff.staffshift,
      staffstatus: staff.staffstatus,
      joiningDate: new Date(staff.joiningDate).toLocaleDateString("en-GB")
    });
  };

  const handleDelete = (id) => { if (window.confirm("Delete this staff?")) dispatch(deleteStaff(id)); };

  return (
    <div className="min-h-screen p-6 bg-gray-900 text-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-6 text-[#D4AF37]">Staff Management</h1>

        {/* Form Card */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">{editingId ? "Edit Staff" : "Add New Staff"}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              name="staffId"
              placeholder="Staff ID"
              value={formData.staffId}
              onChange={handleChange}
              required
              className="border border-gray-600 rounded p-2 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            />
            <input
              type="text"
              name="staffshift"
              placeholder="Shift"
              value={formData.staffshift}
              onChange={handleChange}
              required
              className="border border-gray-600 rounded p-2 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            />
            <input
              type="text"
              name="staffstatus"
              placeholder="Status"
              value={formData.staffstatus}
              onChange={handleChange}
              required
              className="border border-gray-600 rounded p-2 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            />
            <input
              type="text"
              name="joiningDate"
              placeholder="DD-MM-YYYY"
              value={formData.joiningDate}
              onChange={handleChange}
              className="border border-gray-600 rounded p-2 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            />
            <button
              type="submit"
              className="md:col-span-4 bg-[#D4AF37] hover:bg-[#b8962f] text-black font-bold py-2 rounded transition-all"
            >
              {editingId ? "Update Staff" : "Add Staff"}
            </button>
          </form>
        </div>

        {/* Table Card */}
        <div className="bg-gray-800 rounded-lg shadow-md overflow-x-auto">
          {loading && <p className="text-center p-4">Loading staff...</p>}
          {error && <p className="text-center text-red-500 p-4">{error}</p>}

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-400 uppercase text-[12px] border-b border-gray-700">
                <th className="px-4 py-3">Staff ID</th>
                <th className="px-4 py-3">Shift</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Joining Date</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {staffList.length > 0 ? (
                staffList.map((staff) => (
                  <tr key={staff._id} className="hover:bg-gray-700 transition-colors">
                    <td className="px-4 py-3">{staff.staffId}</td>
                    <td className="px-4 py-3">{staff.staffshift}</td>
                    <td className="px-4 py-3">{staff.staffstatus}</td>
                    <td className="px-4 py-3">{new Date(staff.joiningDate).toLocaleDateString()}</td>
                    <td className="px-4 py-3 flex gap-2">
                      <button
                        onClick={() => handleEdit(staff)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition-all"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(staff._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-all"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                !loading && (
                  <tr>
                    <td colSpan={5} className="text-center p-4 text-gray-400">
                      No staff found
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StaffPage;
