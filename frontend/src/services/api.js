import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3333", // ajuste depois para produção
});

// (opcional futuro) interceptador para token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});