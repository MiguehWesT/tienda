import axios from "axios";

const api = axios.create({
  baseURL: "http://3.236.252.150:3000/api/v1",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
//manejo de errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Error en el servidor";
    return Promise.reject(message);
  }
);

export default api;