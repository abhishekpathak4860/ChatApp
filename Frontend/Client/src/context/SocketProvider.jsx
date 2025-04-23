// VideoSocketContext.jsx
import React, { createContext, useMemo, useContext } from "react";
import { io } from "socket.io-client";

const VideoSocketContext = createContext(null);

export const useVideoSocket = () => {
  return useContext(VideoSocketContext);
};

export const VideoSocketProvider = ({ children }) => {
  const socket = useMemo(() => io("https://chatapp-m947.onrender.com/"), []); // server link

  return (
    <VideoSocketContext.Provider value={socket}>
      {children}
    </VideoSocketContext.Provider>
  );
};
