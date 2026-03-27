import express from "express";
import * as orderController from "../controllers/order.controller";

const router = express.Router();

router.get("/", orderController.getOrdersByPage);
router.post("/", orderController.createOrder);
router.get("/:id/items", orderController.getOrderItemsByOrderId);

export default router;
