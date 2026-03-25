import type { Product } from "../product/product";

export interface OrderEntry {
  product: Product;
  quantity: number;
}
