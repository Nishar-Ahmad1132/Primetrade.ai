import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1", // ✅ FIXED
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  // ❌ DO NOT attach token for login/register
  if (
    token &&
    !config.url.includes("/auth/login") &&
    !config.url.includes("/auth/register")
  ) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


export default api;
