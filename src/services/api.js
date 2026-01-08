// src/utils/api.js
import axios from "axios";
// import { BASE_URL } from "../utils/constant";

export const BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log(BASE_URL)
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});

export default api;
