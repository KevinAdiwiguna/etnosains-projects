import axios from "axios";
import { ApiErrorResponse } from "@/types/api";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiError = error.response?.data as ApiErrorResponse | undefined;
    const errorMessage = apiError?.message || error.message || "Terjadi kesalahan pada koneksi";

    return Promise.reject(new Error(errorMessage));
  }
);
