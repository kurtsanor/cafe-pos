import type { OrderItem } from "../orderItem/orderItem";

export interface Order {
  _id: string;
  orderId: string;
  totalAmount: number;
  itemCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateOrderDto {
  orderItems: OrderItem[];
}
