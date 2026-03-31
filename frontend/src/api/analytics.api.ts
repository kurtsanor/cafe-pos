import axiosInstance from "../config/axios";
import type { DashboardAnalytics } from "../types/analytics/analytics";
import type { DailySales } from "../types/order/order";
import type { ApiResponse } from "../types/response/apiResponse";

export const getDashboardStats = async (): Promise<
  ApiResponse<DashboardAnalytics>
> => {
  const response = await axiosInstance.get("/analytics");
  return response.data;
};

export const getSalesByDate = async (
  dateString: Date,
): Promise<ApiResponse<DailySales[]>> => {
  const response = await axiosInstance.get("/analytics/sales", {
    params: { date: dateString },
  });

  return response.data;
};
