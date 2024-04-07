import express from "express";
import bodyParser from "body-parser";
import { createOrder } from "../controllers/ordersController.js";
import { isAuthenticated } from "../auth/auth.js";

const router = express.Router();

router.use(bodyParser.raw({ type: "*/*" }));

router.post("/", createOrder);

export default router;
