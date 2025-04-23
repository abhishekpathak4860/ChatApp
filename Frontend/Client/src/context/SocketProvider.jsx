// VideoSocketContext.jsx
import React, { createContext, useMemo, useContext } from "react";
import { io } from "socket.io-client";

const VideoSocketContext = createContext(null);

export const useVideoSocket = () => {
  return useContext(VideoSocketContext);
};

export const VideoSocketProvider = ({ children }) => {
  const socket = useMemo(() => io("http://localhost:5000/"), []);

  return (
    <VideoSocketContext.Provider value={socket}>
      {children}
    </VideoSocketContext.Provider>
  );
};
