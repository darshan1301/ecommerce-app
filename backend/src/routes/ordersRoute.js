import express from "express";
import bodyParser from "body-parser";
import {
  createPayment,
  getAllOrders,
} from "../controllers/ordersController.js";
import { isAuthenticated } from "../auth/auth.js";

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", isAuthenticated, getAllOrders);
router.post("/", isAuthenticated, createPayment);

export default router;
