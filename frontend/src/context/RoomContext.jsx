import React, { createContext, useState } from "react";
import { roomData } from "../assets/asset";

export const RoomContext = createContext(null);

const RoomContextProvider = ({ children }) => {
  const [rooms] = useState(roomData);

  return (
    <RoomContext.Provider value={{ rooms }}>
      {children}
    </RoomContext.Provider>
  );
};

export default RoomContextProvider;
