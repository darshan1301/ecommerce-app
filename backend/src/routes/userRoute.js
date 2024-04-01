import express from "express";
import {
  getUserInfo,
  userLogin,
  userSignup,
} from "../controllers/userController.js";
import { authRole, isAuthenticated } from "../auth/auth.js";

const router = express.Router();

router.post("/signup", userSignup);

router.post("/login", userLogin);

router.get("/me", isAuthenticated, getUserInfo);

export default router;
