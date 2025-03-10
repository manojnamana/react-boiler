import axios from "axios";
import { BACKEND_URL } from "./appConstants";

const instance = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("auth")
      ? JSON.parse(sessionStorage.getItem("auth")).id_token
      : null;

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  (response) => response,
  (err) => Promise.reject(err)
);

export default instance;
