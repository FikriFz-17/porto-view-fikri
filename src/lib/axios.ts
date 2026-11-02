import axios from "axios";

export const api = axios.create({
  baseURL: "https://porto-backend-go.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
