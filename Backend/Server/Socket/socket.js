import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["https://chatapp-m947.onrender.com/"],
    methods: ["GET", "POST"],
  },
});

export const getReciverSocketId = (receiverId) => {
  return userSocketmap[receiverId];
};

const userSocketmap = {}; //{userId,socketId}
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId) {
    userSocketmap[userId] = socket.id;
  }
  io.emit("getOnlineUsers", Object.keys(userSocketmap));

  socket.on("disconnect", () => {
    delete userSocketmap[userId],
      io.emit("getOnlineUsers", Object.keys(userSocketmap));
  });
});

export { app, io, server };
