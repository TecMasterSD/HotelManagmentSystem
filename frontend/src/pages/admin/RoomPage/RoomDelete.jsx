import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRooms, deleteRoom } from "../../../ReducState/RoomsState/RoomSlice";
  
const RoomDelete = () => {
  const dispatch = useDispatch();
  const { rooms, loading, error } = useSelector((state) => state.room);
  const [selectedRoom, setSelectedRoom] = useState("");

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  const handleDelete = () => {
    if (!selectedRoom) {
      alert("Please select a room to delete!");
      return;
    }
    if (window.confirm("Are you sure you want to delete this room?")) {
      dispatch(deleteRoom(selectedRoom));
      setSelectedRoom("");
    }
  };

  return (
      <div className="min-h-screen p-6 font-sans">
        <h2 className="text-2xl font-serif text-white mb-6">Delete Room</h2>

        {loading && <p className="text-white">Loading rooms...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="mb-4">
          <select
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-white/20 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="">Select a room to delete</option>
            {rooms.map((room) => (
              <option key={room._id} value={room._id}>
                {room.RoomNumber} - {room.type}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Deleting..." : "Delete Room"}
        </button>
      </div>
  );
};

export default RoomDelete;
