import express from "express";
import * as categoryController from "../controllers/category.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/", authenticate, categoryController.getAllCategories);
router.post("/", authenticate, categoryController.createCategory);

export default router;
