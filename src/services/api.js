// src/utils/api.js
import axios from "axios";
import { BASE_URL } from "../utils/constant";

console.log(BASE_URL)
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});

export default api;
