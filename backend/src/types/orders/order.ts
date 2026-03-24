import { Document } from "mongoose";

export interface Order extends Document {
  orderId: string;
  totalAmount: number;
  itemCount: number;
  createdAt: Date;
  updatedAt: Date;
}
