import { Document, Types } from "mongoose";
import { Product } from "../products/product";

export interface OrderItem extends Document {
  orderId: Types.ObjectId;
  orderNumber: string;
  productId: Types.ObjectId;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItemDto {
  product: Product;
  quantity: number;
}
