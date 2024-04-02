import express from "express";
import {
  createOrder,
  createPayment,
  getAllOrders,
} from "../controllers/ordersController.js";
import { isAuthenticated } from "../auth/auth.js";

const router = express.Router();

router.get("/", isAuthenticated, getAllOrders);
router.post("/", isAuthenticated, createPayment);
router.post("/createOrder/", isAuthenticated, createOrder);

export default router;
