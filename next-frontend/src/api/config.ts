import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8002",
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});
