import express from "express";
import dotenv from "dotenv";
import dbConnect from "./DB/dbConnects.js";
import authRouter from "./Route/AuthUser.js";
import messageRouter from "./Route/MessageRoute.js";
import userRouter from "./Route/userRoute.js";
import cookieParser from "cookie-parser";
import path from "path";
import { app, server } from "./Socket/socket.js"; // common socket file

dotenv.config();
const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;

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
