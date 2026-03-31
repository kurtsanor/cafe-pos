import express from "express";
import * as analyticsController from "../controllers/analytics.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = express.Router();

// Retrieve compiled dashboard statistics
router.get("/", authenticate, analyticsController.getDashboardStats);

// Retrieve sales overview over a selected date
router.get("/sales", authenticate, analyticsController.getSalesByDate);

export default router;
