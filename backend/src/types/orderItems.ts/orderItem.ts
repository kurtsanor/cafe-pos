import { Types } from "mongoose";

export interface OrderItem {
  orderId: Types.ObjectId;
  orderNumber: string;
  productId: Types.ObjectId;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}
