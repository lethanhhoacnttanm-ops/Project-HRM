import axiosClient from "../config/axios.js";

export const authService = {
  register: async (registerData) => {
    return await axiosClient.post('/auth/register', registerData);
  },

  login: async (credentials) => {
    return await axiosClient.post('/auth/login', credentials);
  },

  getMe: async () => {
    return await axiosClient.get('/auth/me');
  },

  logout: async () => {
    return await axiosClient.post('/auth/logout');
  },
};