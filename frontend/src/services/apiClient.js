import axios from "axios";
import Cookies from "js-cookie";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1", // Thay bằng URL backend của bạn
  timeout: 10000, // Thời gian chờ
  withCredentials: true, // Sử dụng cookie cho CORS
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor để thêm Authorization token vào header
apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("access_token"); // Lấy token từ cookie "access"

    if (token && token !== "" && token !== "undefined") {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
