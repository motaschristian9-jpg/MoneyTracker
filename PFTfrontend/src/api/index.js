import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

// Attach JWT token automatically
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token"); // <- use sessionStorage here
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
