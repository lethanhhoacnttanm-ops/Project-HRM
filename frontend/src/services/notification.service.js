import axiosClient from '../config/axios.js';

export const notificationService = {
  getMyNotifications: async (params = {}) => {
    return await axiosClient.get('/notifications/me', { params });
  },
};