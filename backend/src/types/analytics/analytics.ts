import { MostOrderedProduct } from "../products/product";

export interface DashboardAnalytics {
  salesToday: number;
  totalProducts: number;
  totalOrders: number;
  averageOrderValue: number;
  mostOrderedProducts: MostOrderedProduct[];
}
