import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRoom } from "../../../ReducState/RoomsState/RoomSlice";
import { toast } from "sonner";

const CreateRoom = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.room);

  const [roomNumber, setRoomNumber] = useState("");
  const [roomType, setRoomType] = useState("Standard");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("available");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!roomNumber || !roomType || !price || !status) {
      toast.error("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("RoomNumber", roomNumber);
    formData.append("type", roomType);
    formData.append("Price", price);
    formData.append("Status", status);
    if (image) formData.append("image", image);

    dispatch(createRoom(formData))
      .unwrap()
      .then(() => {
        toast.success("Room created successfully!");
        setRoomNumber("");
        setRoomType("Standard");
        setPrice("");
        setStatus("available");
        setImage(null);
      })
      .catch((err) => toast.error(err || "Something went wrong"));
  };

  return (
    <div className="min-h-screen bg-[#0F1717] flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-md p-8 rounded-xl border border-white/10 shadow-2xl">
        <h2 className="text-2xl font-serif text-white mb-6 text-center">
          Create New Room
        </h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input type="number" placeholder="Room Number" value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-white/20 text-white px-4 py-2 rounded-md" />

          <select value={roomType} onChange={(e) => setRoomType(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-white/20 text-white px-4 py-2 rounded-md">
            <option value="Standard">Standard</option>
            <option value="Deluxe">Deluxe</option>
            <option value="Luxury">Luxury</option>
            <option value="Suite">Suite</option>
          </select>

          <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-white/20 text-white px-4 py-2 rounded-md" />

          <select value={status} onChange={(e) => setStatus(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-white/20 text-white px-4 py-2 rounded-md">
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="cleaning">Cleaning</option>
            <option value="maintenance">Maintenance</option>
          </select>

          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])}
            className="w-full bg-[#1a1a1a] border border-white/20 text-white px-4 py-2 rounded-md" />

          <button type="submit" disabled={loading}
            className="w-full py-2 bg-[#D4AF37] text-black font-bold uppercase rounded-md hover:bg-[#b8962f]">
            {loading ? "Creating..." : "Create Room"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRoom;
