// services/httpService.ts
import axios from "axios";

const baseURL = "http://localhost:5000/api/v1/";
console.log("API Base URL:", baseURL); // Debugging line to check the base URL
const http = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
};
