import axios from "axios";
import axiosInstance from "../config/axios";
import type { LoginRequest, LoginResponse } from "../types/auth/auth";
import type { ApiResponse } from "../types/response/apiResponse";

export const login = async (
  loginRequest: LoginRequest,
): Promise<ApiResponse<LoginResponse>> => {
  const response = await axiosInstance.post("/auth/login", loginRequest);
  return response.data;
};

export const logout = async (): Promise<ApiResponse<null>> => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};

export const refreshToken = async (): Promise<ApiResponse<LoginResponse>> => {
  const response = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/auth/refresh`,
    {},
    { withCredentials: true },
  );
  return response.data;
};
