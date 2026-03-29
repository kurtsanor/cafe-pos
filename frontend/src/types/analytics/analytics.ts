import type { MostOrderedProduct } from "../product/product";

export interface DashboardAnalytics {
  salesToday: number;
  totalProducts: number;
  totalOrders: number;
  averageOrderValue: number;
  mostOrderedProducts: MostOrderedProduct[];
}
