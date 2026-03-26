import { Document } from "mongoose";
import { Product } from "../products/product";
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
