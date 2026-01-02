import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRooms, deleteRoom } from "../../../ReducState/RoomsState/RoomSlice";
import { Link } from "react-router-dom";

const RoomView = () => {
  const dispatch = useDispatch();
  const { rooms = [], loading, error } = useSelector((state) => state.room || {});

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  const handleDelete = (roomId) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      dispatch(deleteRoom(roomId));
    }
  };

  return (
    <div className="min-h-screen p-6 font-sans">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif text-white">All Rooms</h2>
        <Link
          to="/admin/rooms/create"
          className="px-4 py-2 bg-[#D4AF37] text-black font-bold rounded-md hover:bg-[#b8962f]"
        >
          Create New Room
        </Link>
      </div>

      {loading && <p className="text-white">Loading rooms...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-white/70 uppercase text-[12px] border-b border-white/10">
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Room Number</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/10">
            {rooms.map((room) => (
              <tr key={room._id} className="hover:bg-white/5">
                <td className="px-4 py-2">
                  {room.image ? (
                    <img
                      src={`http://localhost:5000/${room.image}`} // old & new images
                      alt={`Room ${room.RoomNumber}`}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  ) : (
                    <span className="text-white/50">No Image</span>
                  )}
                </td>
                <td className="px-4 py-2 text-white">{room.RoomNumber}</td>
                <td className="px-4 py-2 text-white">{room.type}</td>
                <td className="px-4 py-2 text-white">${room.Price}</td>
                <td className="px-4 py-2 text-white capitalize">{room.Status}</td>
                <td className="px-4 py-2 flex gap-2">
                  <Link
                    to={`/admin/rooms/update/${room._id}`}
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(room._id)}
                    className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {rooms.length === 0 && !loading && (
              <tr>
                <td colSpan={6} className="text-center text-white py-4">
                  No rooms found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoomView;
