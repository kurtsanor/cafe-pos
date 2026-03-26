import type { Product } from "../product/product";

export interface OrderItem {
  product: Product;
  quantity: number;
}
