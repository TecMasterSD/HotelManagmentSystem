import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRooms } from "../../ReducState/RoomsState/RoomSlice";
import { FaBath, FaBed, FaUserFriends, FaWifi, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const amenitiesList = [
  { label: "2 Pers", icon: <FaUserFriends /> },
  { label: "Bath", icon: <FaBath /> },
  { label: "King Bed", icon: <FaBed /> },
  { label: "Wifi", icon: <FaWifi /> },
];

const ListingPage = () => {
  const dispatch = useDispatch();

  const { rooms = [], loading, error } = useSelector(
    (state) => state.room || {}
  );

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  if (loading) {
    return <p className="text-center mt-32 text-white">Loading rooms...</p>;
  }

  if (error) {
    return <p className="text-center mt-32 text-red-500">{error}</p>;
  }

  return (
    <section className=" bg-linear-to-b from-[#0F1717] via-[#2a1e24] to-[#8f6e7a] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <p className="text-[11px] tracking-[0.5em] uppercase text-[#D4AF37] font-semibold mb-3">
            Exclusive Experience
          </p>
          <h2 className="text-4xl font-serif text-white leading-tight">
            Our Luxury Suites
          </h2>
          <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mt-4"></div>
        </div>

        {/* ROOMS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {rooms.map((room) => (
            <div
              key={room._id}
              className="bg-white/95 backdrop-blur-sm group shadow-lg flex flex-col"
            >
              {/* IMAGE */}
              <div className="relative overflow-hidden h-72">
                <Link to={`/hotel/${room._id}`}>
                  <img
                    src={`http://localhost:5000/${room.image}`}
                    alt={room.type}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all duration-300"></div>

                  <div className="absolute bottom-0 left-0 bg-[#0F1717] text-[#D4AF37] px-4 py-2 font-mono text-sm">
                    ${room.Price}
                    <span className="text-[10px] text-white/60"> / NIGHT</span>
                  </div>
                </Link>
              </div>

              {/* CONTENT */}
              <div className="p-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-serif text-[#0F1717]">
                    {room.type}
                  </h3>

                  <Link
                    to={`/hotel/${room._id}`}
                    className="text-[#D4AF37] group-hover:translate-x-1 transition-transform"
                  >
                    <FaArrowRight size={18} />
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-5">
                  {amenitiesList.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-[13px] text-gray-500"
                    >
                      <span className="text-[#D4AF37]">{item.icon}</span>
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {rooms.length === 0 && (
          <p className="text-center text-white mt-10">
            No rooms available
          </p>
        )}
      </div>
    </section>
  );
};

export default ListingPage;
