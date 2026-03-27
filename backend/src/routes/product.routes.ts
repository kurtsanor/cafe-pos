import express from "express";
import * as productController from "../controllers/product.controller";
import upload from "../config/multer";

const router = express.Router();

router.post("/", upload.single("image"), productController.createProduct);
router.get("/", productController.getProductsByPage);
router.delete("/:id", productController.deleteProductById);
router.patch("/:id", upload.single("image"), productController.updateProduct);

export default router;
