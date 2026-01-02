import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchRooms, updateRoom } from "../../../ReducState/RoomsState/RoomSlice";
import { toast } from "sonner";

// Admin Layout import

const UpdateRoom = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { rooms, loading, error } = useSelector((state) => state.room);

  const [roomNumber, setRoomNumber] = useState("");
  const [roomType, setRoomType] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!rooms.length) dispatch(fetchRooms());
  }, [dispatch, rooms.length]);

  const room = rooms.find((r) => r._id === id);

  useEffect(() => {
    if (room) {
      setRoomNumber(room.RoomNumber);
      setRoomType(room.type);
      setPrice(room.Price);
      setStatus(room.Status);
      setPreview(room.image ? `http://localhost:5000/${room.image}` : null);
    }
  }, [room]);

  useEffect(() => {
    if (image) {
      const url = URL.createObjectURL(image);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [image]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!room) return toast.error("Room data not loaded yet");

    const formData = new FormData();
    formData.append("RoomNumber", roomNumber);
    formData.append("type", roomType);
    formData.append("Price", price);
    formData.append("Status", status);
    if (image) formData.append("image", image);

    dispatch(updateRoom({ roomId: id, updatedData: formData }))
      .unwrap()
      .then(() => toast.success("Room updated successfully"))
      .catch(() => toast.error("Update failed"));
  };

  if (!room) {
    return (
        <p className="text-white text-center mt-10">Loading room data...</p>
    );
  }

  return (
      <div className="max-w-3xl mx-auto bg-[#0F1717] p-6 rounded-xl border border-white/10 mt-10">
        <h2 className="text-2xl font-serif text-white mb-6">Update Room</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Room Number */}
          <div>
            <label className="block text-sm text-white/70 mb-1">Room Number</label>
            <input
              type="number"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            />
          </div>

          {/* Room Type */}
          <div>
            <label className="block text-sm text-white/70 mb-1">Room Type</label>
            <select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            >
              <option value="Standard">Standard</option>
              <option value="Deluxe">Deluxe</option>
              <option value="Luxury">Luxury</option>
              <option value="Suite">Suite</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm text-white/70 mb-1">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm text-white/70 mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            >
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
              <option value="cleaning">Cleaning</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>

          {/* Image Upload */}
          <div className="md:col-span-2">
            <label className="block text-sm text-white/70 mb-1">Room Image</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-[#D4AF37] file:text-black hover:file:bg-[#b8962f]"
            />
          </div>

          {/* Preview */}
          {preview && (
            <div className="md:col-span-2">
              <p className="text-sm text-white/60 mb-2">Preview</p>
              <img
                src={preview}
                alt="preview"
                className="w-40 h-40 object-cover rounded-lg border border-white/10"
              />
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="md:col-span-2 text-red-500 text-sm">{error}</div>
          )}

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-[#D4AF37] text-black font-semibold rounded-md hover:bg-[#b8962f] disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Room"}
            </button>
          </div>
        </form>
      </div>
  );
};

export default UpdateRoom;
