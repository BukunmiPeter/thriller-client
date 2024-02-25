import axios, { AxiosError } from "axios";
import { ITransferData, User } from "./types";

// const API = axios.create({ baseURL: "http://localhost:3001" });
const API = axios.create({ baseURL: "https://thriller-server-3.onrender.com" });
API.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (!error.response) {
      // Network error
    console.log('Something went wrong. Please try again later.');
    } else {
      console.log
      ('An error occurred. Please try again later.');
    }

    return Promise.reject(error);
  }
);


export const login = (userData: User) => API.post(`/login`, userData);
export const register = (userData: User) => API.post(`/users`, userData);
export const getUserBalance = (userId: string | undefined) => API.get(`/users/${userId}/balance`);
export const getAllUsers = () => API.get(`/users`);
export const makeTransfer = (transferData: ITransferData) => API.post(`/transfer`, transferData);
export const getUserTransactionHistory = (userId: string | undefined) => API.get(`/${userId}/transactions`);