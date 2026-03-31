import axios from "axios";
import {
  clearAccessToken,
  getAccessToken,
  setAccessToken,
} from "../store/auth.store";

const API_BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

// attach access token to every request
axiosInstance.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// auto-refresh on 401 using refresh token from cookies
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    // silently call the refresh endpoint if request is unauthorized
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/auth/refresh`,
          {},
          { withCredentials: true },
        );
        setAccessToken(data.data.accessToken);
        original.headers.Authorization = `Bearer ${data.data.accessToken}`;
        return axiosInstance(original); // retry original request
      } catch {
        clearAccessToken();
        window.location.href = "/"; // force logout
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
