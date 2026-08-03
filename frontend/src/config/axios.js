import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});

axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const data = error.response?.data;
    const msg = 
      data?.message || 
      (Array.isArray(data?.errors) ? data.errors[0] : null) || 
      'Email hoặc mật khẩu không chính xác!';

    error.customMessage = msg;
    return Promise.reject(error);
  }
);

export default axiosClient;