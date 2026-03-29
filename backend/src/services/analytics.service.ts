import Order from "../models/Order";
import OrderItem from "../models/OrderItem";
import Product from "../models/Product";
import { DashboardAnalytics } from "../types/analytics/analytics";
import { DailySales } from "../types/orders/order";
import { MostOrderedProduct } from "../types/products/product";

export const getDashboardStats = async (): Promise<DashboardAnalytics> => {
  const [
    salesToday,
    totalProducts,
    totalOrders,
    averageOrderValue,
    mostOrderedProducts,
  ] = await Promise.all([
    getTotalSalesToday(),
    getTotalProducts(),
    getTotalOrders(),
    getAverageOrderValue(),
    getMostOrderedProducts(),
  ]);

  return {
    salesToday,
    totalProducts,
    totalOrders,
    averageOrderValue,
    mostOrderedProducts,
  };
};

export const getTotalOrders = async (): Promise<number> => {
  return await Order.countDocuments();
};

export const getTotalSalesToday = async (): Promise<number> => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  const result = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: start, $lte: end }, // filter to greater or equal to start date and less than or equal end date
      },
    },
    {
      $group: {
        _id: null,
        totalSales: { $sum: "$totalAmount" }, // totalSales -> return attribute. $totalAmount -> Order field
      },
    },
  ]);

  return result[0]?.totalSales || 0;
};

export const getAverageOrderValue = async (): Promise<number> => {
  const result = await Order.aggregate([
    {
      $group: {
        _id: null,
        average: { $avg: "$totalAmount" },
      },
    },
  ]);
  return result[0]?.average || 0;
};

export const getTotalProducts = async (): Promise<number> => {
  return await Product.countDocuments();
};

export const getMostOrderedProducts = async (): Promise<
  MostOrderedProduct[]
> => {
  const result = await OrderItem.aggregate([
    {
      $group: {
        _id: "$productId",
        Orders: { $sum: "$quantity" }, // match field name exactly
      },
    },
    { $sort: { Orders: -1 } },
    { $limit: 5 },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "product",
      },
    },
    { $unwind: "$product" },
    {
      $project: {
        _id: 0,
        product: "$product.name", // match desired key
        Orders: 1,
      },
    },
  ]);

  return result;
};

/**
 * Get sales overview for a month given a date string (YYYY-MM-DD)
 * @param monthDate - any date in the target month (e.g., "2026-03-01")
 */
export const getSalesByDate = async (
  monthDate: string,
): Promise<DailySales[]> => {
  const parsed = new Date(monthDate);

  // start of month
  const start = new Date(
    parsed.getFullYear(),
    parsed.getMonth(),
    1,
    0,
    0,
    0,
    0,
  );

  // end of month
  const end = new Date(
    parsed.getFullYear(),
    parsed.getMonth() + 1,
    0,
    23,
    59,
    59,
    999,
  );

  const result = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: start, $lte: end },
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: "%b %d", date: "$createdAt" } },
        sales: { $sum: "$totalAmount" },
      },
    },
    { $sort: { _id: 1 } },
    {
      $project: {
        _id: 0,
        date: "$_id",
        Sales: "$sales",
      },
    },
  ]);

  return result;
};
