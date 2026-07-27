import axiosClient from "../config/axios.js";

export const authService = {
  register: async (registerData) => {
    return await axiosClient.post('/auth/register', registerData);
  },

  getMe: async () => {
    return await axiosClient.get('/auth/me');
  },
};