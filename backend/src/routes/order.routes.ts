import express from "express";
import * as orderController from "../controllers/order.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = express.Router();

// Retrive orders
router.get("/", authenticate, orderController.getOrdersByPage);

// Create an order
router.post("/", authenticate, orderController.createOrder);

// Get order items by order ID
router.get("/:id/items", authenticate, orderController.getOrderItemsByOrderId);

export default router;
