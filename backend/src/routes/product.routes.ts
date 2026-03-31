import express from "express";
import * as productController from "../controllers/product.controller";
import upload from "../config/multer";
import { authenticate } from "../middlewares/auth.middleware";

const router = express.Router();

// Create new product
router.post(
  "/",
  authenticate,
  upload.single("image"),
  productController.createProduct,
);

// Retrieve products
router.get("/", authenticate, productController.getProductsByPage);

// Delete a product
router.delete("/:id", authenticate, productController.deleteProductById);

// Update / Patch a product
router.patch(
  "/:id",
  authenticate,
  upload.single("image"),
  productController.updateProduct,
);

export default router;
