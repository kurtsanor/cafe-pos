import axiosInstance from "../config/axios";
import type { PaginatedResponse } from "../types/pagination/pagination";
import type { Product, UpdateProductInput } from "../types/product/product";
import type { ApiResponse } from "../types/response/apiResponse";

export const createProduct = async (
  data: FormData,
): Promise<ApiResponse<Product>> => {
  const response = await axiosInstance.post("/products", data);
  return response.data;
};

export const getProductsByPage = async (
  page: number,
  category: string,
): Promise<ApiResponse<PaginatedResponse<Product[]>>> => {
  const response = await axiosInstance.get("/products", {
    params: { page, category },
  });
  console.log(`category: ${category}, page: ${page}`);

  return response.data;
};

export const updateProduct = async (
  input: UpdateProductInput,
): Promise<ApiResponse<Product>> => {
  const response = await axiosInstance.patch(
    `/products/${input.id}`,
    input.data,
  );
  return response.data;
};

export const deleteProductById = async (
  id: string,
): Promise<ApiResponse<void>> => {
  const response = await axiosInstance.delete(`/products/${id}`);
  return response.data;
};
