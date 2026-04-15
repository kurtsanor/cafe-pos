import axiosInstance from "../config/axios";
import type { Category, CreateCategoryDto } from "../types/categories/category";
import type { ApiResponse } from "../types/response/apiResponse";

export const getAllCategories = async (): Promise<ApiResponse<Category[]>> => {
  const response = await axiosInstance.get("/categories");
  return response.data;
};

export const createCategory = async (
  category: CreateCategoryDto,
): Promise<ApiResponse<Category>> => {
  const response = await axiosInstance.post("/categories", category);
  return response.data;
};
