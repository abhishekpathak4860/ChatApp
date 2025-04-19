import express from "express";
import {
  UserLogin,
  UserRegister,
  UserLogout,
} from "../Controllers/UserRouteControl.js";

const router = express.Router();

router.post("/register", UserRegister);
router.post("/login", UserLogin);
router.post("/logout", UserLogout);

export default router;
