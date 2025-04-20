import express from "express";
import dotenv from "dotenv";
import dbConnect from "./DB/dbConnects.js";
import authRouter from "./Route/AuthUser.js";
import messageroute from "./Route/MessageRoute.js";
import cookieParser from "cookie-parser";
import userRouter from "./Route/userRoute.js";
import { app, server } from "./Socket/socket.js";
import path from "path";

const __dirname = path.resolve();

dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

// Define API routes first
app.use("/api/auth", authRouter);
app.use("/api/message", messageroute);
app.use("/api/user", userRouter);

// Serve static files from the Frontend dist folder
app.use(express.static(path.join(__dirname, "Frontend", "Client", "dist")));

// The wildcard route should come last
app.get("", (req, res) => {
  res.sendFile(
    path.join(__dirname, "Frontend", "Client", "dist", "index.html")
  );
});
server.listen(PORT, () => {
  dbConnect();
  console.log("server started on port " + PORT);
});
