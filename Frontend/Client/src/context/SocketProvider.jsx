// VideoSocketContext.jsx
import React, { createContext, useMemo, useContext } from "react";
import { io } from "socket.io-client";

const VideoSocketContext = createContext(null);

export const useVideoSocket = () => {
  return useContext(VideoSocketContext);
};

export const VideoSocketProvider = ({ children }) => {
  // const socket = useMemo(() => io("https://chat-backend-in0f.onrender.com/"), []); // server link
  const socket = useMemo(() => io(import.meta.env.VITE_SOCKET_URL), []);
  return (
    <VideoSocketContext.Provider value={socket}>
      {children}
    </VideoSocketContext.Provider>
  );
};
