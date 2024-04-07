import express from "express";
import {
  addProduct,
  deleteProduct,
  editProduct,
} from "../controllers/adminDashboardController.js";
import { authRole, isAuthenticated } from "../auth/auth.js";
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post(
  "/addProduct",
  isAuthenticated,
  authRole("ADMIN"),
  upload.single("image"),
  addProduct
);

router.patch(
  "/:productId",
  isAuthenticated,
  authRole("ADMIN"),
  upload.single("image"),
  editProduct
);
router.delete("/:productId", isAuthenticated, authRole("ADMIN"), deleteProduct);

export default router;
