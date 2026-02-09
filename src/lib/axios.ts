import axios from "axios";

export const api = axios.create({
  baseURL: "https://porto-backend-topaz.vercel.app/api/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
