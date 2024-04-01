import express from "express";
import {
  getProductDetails,
  getProducts,
} from "../controllers/productsController.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:productId", getProductDetails);

export default router;
