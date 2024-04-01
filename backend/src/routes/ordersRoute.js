import express from "express";
import { createOrder, getAllOrders } from "../controllers/ordersController.js";

const router = express.Router();

router.get("/", getAllOrders);
router.post("/createOrder", createOrder);

export default router;
