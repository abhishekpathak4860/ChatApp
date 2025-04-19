import express from "express";
import {
  getMessages,
  sendmessage,
} from "../Controllers/MessageRouteControl.js";
import isLogin from "../Middleware/isLogin.js";
const router = express.Router();

router.post("/send/:id", isLogin, sendmessage); // id:receiver id
router.get("/:id", isLogin, getMessages);

export default router;
