import React, { useContext } from "react";
import { RoomContext } from "../context/RoomContext";
import {
  FaBath,
  FaBed,
  FaUserFriends,
  FaWifi,
  FaArrowRight,
} from "react-icons/fa";

const amenitiesList = [
  { label: "2 Pers", icon: <FaUserFriends /> },
  { label: "Bath", icon: <FaBath /> },
  { label: "King Bed", icon: <FaBed /> },
  { label: "Wifi", icon: <FaWifi /> },
];

const HotelList = () => {
  const context = useContext(RoomContext);

  if (!context) {
    return <p className="text-center text-white">Loading...</p>;
  }

  const { rooms } = context;

  return (
    <section className="py-20 px-6 bg-[#0F1717]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl text-white text-center mb-12">
          Our Luxury Suites
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {rooms.map((room) => (
            <div key={room.id} className="bg-white shadow-lg">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover"
                />

                <div className="absolute bottom-0 left-0 bg-black/70 text-white px-4 py-2 text-sm">
                  ${room.price} / Night
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  {room.name}
                </h3>

                <p className="text-sm text-gray-500 mb-4">
                  {room.description}
                </p>

                <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                  {amenitiesList.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-yellow-600">{item.icon}</span>
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HotelList;
