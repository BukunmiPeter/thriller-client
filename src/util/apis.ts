import axios, { AxiosError } from "axios";
import { ITransferData, User } from "./types";

// Create an Axios instance
const API = axios.create({ baseURL: "http://localhost:3001" });

// Add a response interceptor
API.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (!error.response) {
      // Network error
      console.error('Network error:', error.message);
      // You can show a user-friendly error message here
      alert('Network error. Please check your internet connection.');
    } else {
      // Other errors (e.g., 4xx, 5xx)
      console.error('Request error:', error.response.status, error.response.data);
      // You can show a user-friendly error message here
      alert('An error occurred. Please try again later.');
    }

    // Pass the error to the catch block
    return Promise.reject(error);
  }
);

// Use `API` for your requests instead of `axios`

export const login = (userData: User) => API.post(`/login`, userData);
export const register = (userData: User) => API.post(`/register`, userData);
export const getUserBalance = (userId: string | undefined) => API.get(`/users/${userId}/balance`);
export const getAllUsers = () => API.get(`/users`);
export const makeTransfer = (transferData: ITransferData) => API.post(`/transfer`, transferData);
export const getUserTransactionHistory = (userId: string | undefined) => API.get(`/${userId}/transactions`);