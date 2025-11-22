import express from "express";
import dotenv from "dotenv";
import dbConnect from "./DB/dbConnects.js";
import authRouter from "./Route/AuthUser.js";
import messageRouter from "./Route/MessageRoute.js";
import userRouter from "./Route/userRoute.js";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
import { app, server } from "./Socket/socket.js";

dotenv.config();
const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: [
    "http://localhost:5173", // development
    "https://chat-app-p6vk.vercel.app", // production
  ],
  methods: ["GET", "POST"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);
app.use("/api/user", userRouter);

app.use(express.static(path.join(__dirname, "Frontend", "Client", "dist")));

app.get("/*path", (req, res) => {
  res.sendFile(
    path.join(__dirname, "Frontend", "Client", "dist", "index.html")
  );
});

server.listen(PORT, () => {
  dbConnect();
  console.log("Server listening on port", PORT);
});
