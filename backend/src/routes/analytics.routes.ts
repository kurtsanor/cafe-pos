import express from "express";
import * as analyticsController from "../controllers/analytics.controller";

const router = express.Router();

router.get("/", analyticsController.getDashboardStats);
router.get("/sales", analyticsController.getSalesByDate);

export default router;
