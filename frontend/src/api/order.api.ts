import axiosInstance from "../config/axios";
import type { CreateOrderDto, Order } from "../types/order/order";
import type { PaginatedResponse } from "../types/pagination/pagination";
import type { ApiResponse } from "../types/response/apiResponse";

export const createOrder = async (
  data: CreateOrderDto,
): Promise<ApiResponse<Order>> => {
  const response = await axiosInstance.post("/orders", data);
  return response.data;
};

export const getOrdersByPage = async (
  page: number,
): Promise<ApiResponse<PaginatedResponse<Order[]>>> => {
  const response = await axiosInstance.get("/orders", {
    params: { page },
  });
  return response.data;
};
