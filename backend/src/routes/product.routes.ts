import express from "express";
import * as productController from "../controllers/product.controller";

const router = express.Router();

router.post("/", productController.createProduct);
router.get("/", productController.getAllProducts);

export default router;
