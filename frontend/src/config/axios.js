import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Thêm token vào Header của mỗi Request
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Xử lý Response & Error tập trung
axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const data = error.response?.data;
    const msg =
      data?.message ||
      (Array.isArray(data?.errors) ? data.errors[0] : null) ||
      'Có lỗi xảy ra, vui lòng thử lại!';

    error.customMessage = msg;
    return Promise.reject(error);
  }
);

export default axiosClient;