import axiosInstance from "../config/axios";
import type { Product } from "../types/product/product";
import type { ApiResponse } from "../types/response/apiResponse";

export const getAllProducts = async (): Promise<ApiResponse<Product[]>> => {
  const response = await axiosInstance.get("/products");
  return response.data;
};

export const createProduct = async (
  data: FormData,
): Promise<ApiResponse<Product>> => {
  const response = await axiosInstance.post("/products", data);
  return response.data;
};
