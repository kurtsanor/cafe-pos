import type { Product } from "../product/product";

export interface OrderItem {
  product: Product;
  quantity: number;
}

export interface MongooseOrderItem {
  _id?: string;
  orderId: string;
  orderNumber: string;
  productId: { name: string; _id: string };
  price: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}
