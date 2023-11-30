import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000/api",
  headers: { "Content-Type": "application/json" },
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    config.headers.Authorization = accessToken;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
