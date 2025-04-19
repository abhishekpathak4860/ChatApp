import express from "express";
import isLogin from "../Middleware/isLogin.js";
import {
  getAllUsers,
  getUserBySearch,
} from "../Controllers/GetUserRouteControl.js";

const router = express.Router();

router.get("/search", isLogin, getUserBySearch);
router.get("/currentusers", isLogin, getAllUsers);
export default router;
