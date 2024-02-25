import axios from "axios";
import { ITransferData, User } from "./types";
 const headers = {
    'Content-Type': 'application/json'
  };
const API = axios.create({ baseURL: "http://localhost:3001"});
export const login = (userData:User) => API.post(`/login`, userData, { headers});
export const register = (userData:User) => API.post(`/register`, userData);
export const getUserBalance = (userId:string  | undefined) => API.get(`/users/${userId}/balance`);
export const getAllUsers = () => API.get(`/users`, { headers});
export const makeTransfer = (transferData:ITransferData) => API.post(`/transfer`, transferData);
export const getUserTransactionHistory = (userId:string  | undefined) => API.get(`/${userId}/transactions`);