import express from "express";
import dotenv from "dotenv";
import dbConnect from "./DB/dbConnects.js";
import authRouter from "./Route/AuthUser.js";
import messageroute from "./Route/MessageRoute.js";
import cookieParser from "cookie-parser";
import userRouter from "./Route/userRoute.js";

import { app, server } from "./Socket/socket.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/message", messageroute);
app.use("/api/user", userRouter);

server.listen(PORT, () => {
  dbConnect();
  console.log("server started");
});
