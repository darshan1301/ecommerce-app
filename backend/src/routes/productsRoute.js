import express from "express";
import {
  getProductDetails,
  getProducts,
} from "../controllers/productsController.js";

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", getProducts);
router.get("/:productId", getProductDetails);

export default router;
