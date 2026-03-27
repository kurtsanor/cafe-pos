import axiosInstance from "../config/axios";
import type { PaginatedResponse } from "../types/pagination/pagination";
import type { Product } from "../types/product/product";
import type { ApiResponse } from "../types/response/apiResponse";

export const getProductsByPage = async (
  page: number,
): Promise<ApiResponse<PaginatedResponse<Product[]>>> => {
  const response = await axiosInstance.get("/products", {
    params: { page },
  });
  return response.data;
};

export const createProduct = async (
  data: FormData,
): Promise<ApiResponse<Product>> => {
  const response = await axiosInstance.post("/products", data);
  return response.data;
};

export const deleteProductById = async (
  id: string,
): Promise<ApiResponse<void>> => {
  const response = await axiosInstance.delete(`/products/${id}`);
  console.log(response);

  return response.data;
};
