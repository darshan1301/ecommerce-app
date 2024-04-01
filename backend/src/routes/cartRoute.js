import express from "express";
import {
  addToCart,
  deleteFromCart,
  getCart,
  updateCart,
} from "../controllers/cartController.js";
import { isAuthenticated } from "../auth/auth.js";

const router = express.Router();

router.get("/", isAuthenticated, getCart);
router.post("/addToCart", isAuthenticated, addToCart);
router.patch("/:productId", isAuthenticated, updateCart);
router.delete("/:productId", isAuthenticated, deleteFromCart);

export default router;
