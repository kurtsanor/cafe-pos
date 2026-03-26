import axiosInstance from "../config/axios";
import type { CreateOrderDto, Order } from "../types/order/order";
import type { ApiResponse } from "../types/response/apiResponse";

export const createOrder = async (
  data: CreateOrderDto,
): Promise<ApiResponse<Order>> => {
  const response = await axiosInstance.post("/orders", data);
  return response.data;
};

export const getAllOrders = async (): Promise<ApiResponse<Order[]>> => {
  const response = await axiosInstance.get("/orders");
  return response.data;
};
