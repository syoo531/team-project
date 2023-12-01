import axios from "axios";

const instance = axios.create({
  baseURL: "http://kdt-sw-6-team04.elicecoding.com/api",
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
  }
);

export default instance;
