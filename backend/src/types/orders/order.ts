import { Document } from "mongoose";
import { OrderItemDto } from "../orderItems/orderItems";

export interface Order extends Document {
  orderId: string;
  totalAmount: number;
  itemCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateOrderDto {
  orderItems: OrderItemDto[];
}

export interface DailySales {
  date: string; // e.g., "2026-03-01"
  Sales: number;
}
