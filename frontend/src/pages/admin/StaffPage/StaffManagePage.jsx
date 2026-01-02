import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStaff, updateStaff, deleteStaff } from './staffSlice';

const StaffManagePage = () => {
    const dispatch = useDispatch();
    const { staffList, loading, error } = useSelector(state => state.staff);

    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({
        staffshift: '',
        staffstatus: '',
        joiningDate: ''
    });

    useEffect(() => {
        dispatch(fetchStaff());
    }, [dispatch]);

    const handleEditClick = (staff) => {
        setEditingId(staff._id);
        setEditData({
            staffshift: staff.staffshift,
            staffstatus: staff.staffstatus,
            joiningDate: new Date(staff.joiningDate).toLocaleDateString('en-GB')
        });
    };

    const handleChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(updateStaff({ id: editingId, staffData: editData }));
        setEditingId(null);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this staff?')) {
            dispatch(deleteStaff(id));
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Manage Staff</h1>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border p-2">Staff ID</th>
                        <th className="border p-2">Shift</th>
                        <th className="border p-2">Status</th>
                        <th className="border p-2">Joining Date</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {staffList.map((staff) => (
                        <tr key={staff._id}>
                            <td className="border p-2">{staff.staffId}</td>
                            <td className="border p-2">
                                {editingId === staff._id ? (
                                    <input type="text" name="staffshift" value={editData.staffshift} onChange={handleChange} className="border p-1 w-full"/>
                                ) : (
                                    staff.staffshift
                                )}
                            </td>
                            <td className="border p-2">
                                {editingId === staff._id ? (
                                    <input type="text" name="staffstatus" value={editData.staffstatus} onChange={handleChange} className="border p-1 w-full"/>
                                ) : (
                                    staff.staffstatus
                                )}
                            </td>
                            <td className="border p-2">
                                {editingId === staff._id ? (
                                    <input type="text" name="joiningDate" value={editData.joiningDate} onChange={handleChange} className="border p-1 w-full"/>
                                ) : (
                                    new Date(staff.joiningDate).toLocaleDateString()
                                )}
                            </td>
                            <td className="border p-2 space-x-2">
                                {editingId === staff._id ? (
                                    <button onClick={handleUpdate} className="bg-green-500 text-white px-2 py-1 rounded">Save</button>
                                ) : (
                                    <button onClick={() => handleEditClick(staff)} className="bg-yellow-400 text-white px-2 py-1 rounded">Edit</button>
                                )}
                                <button onClick={() => handleDelete(staff._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StaffManagePage;
