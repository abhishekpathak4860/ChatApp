// import { Server } from "socket.io";
// import http from "http";
// import express from "express";

// const app = express();

// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: ["http://localhost:5173"],
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });

// export const getReciverSocketId = (receiverId) => {
//   return userSocketmap[receiverId];
// };

// const userSocketmap = {}; //{userId,socketId}
// io.on("connection", (socket) => {
//   const userId = socket.handshake.query.userId;

//   if (userId) {
//     userSocketmap[userId] = socket.id;
//   }
//   io.emit("getOnlineUsers", Object.keys(userSocketmap));

//   socket.on("disconnect", () => {
//     delete userSocketmap[userId],
//       io.emit("getOnlineUsers", Object.keys(userSocketmap));
//   });
// });

// export { app, io, server };

// socket.js
import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["https://chat-app-p6vk.vercel.app"], // vercel link
    methods: ["GET", "POST"],
    credentials: true,
  },
});
const userSocketmap = {}; // { userId: socketId }

export const getReciverSocketId = (receiverId) => {
  return userSocketmap[receiverId];
};

const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();

io.on("connection", (socket) => {
  // Chat logic
  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketmap[userId] = socket.id;
    io.emit("getOnlineUsers", Object.keys(userSocketmap));
  }

  //  Video logic
  socket.on("room:join", ({ email, room }) => {
    emailToSocketIdMap.set(email, socket.id);
    socketidToEmailMap.set(socket.id, email);
    socket.join(room);
    io.to(room).emit("user:joined", { email, id: socket.id });
    io.to(socket.id).emit("room:join", { email, room });
  });

  socket.on("user:call", ({ to, offer }) => {
    io.to(to).emit("incomming:call", { from: socket.id, offer });
  });

  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
  });

  socket.on("peer:nego:needed", ({ to, offer }) => {
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", ({ to, ans }) => {
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });

  // --- Disconnect logic ---
  socket.on("disconnect", () => {
    if (userId) {
      delete userSocketmap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketmap));
    }
    const email = socketidToEmailMap.get(socket.id);
    emailToSocketIdMap.delete(email);
    socketidToEmailMap.delete(socket.id);
  });
});

export { io, app, server };
