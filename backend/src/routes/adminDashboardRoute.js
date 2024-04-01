import express from "express";
import {
  addProduct,
  deleteProduct,
  editProduct,
} from "../controllers/adminDashboardController.js";

const router = express.Router();

router.post("/addProduct", addProduct);
router.patch("/:productId", editProduct);
router.delete("/:productId", deleteProduct);

export default router;
