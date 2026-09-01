import axiosClient from '../config/axios.js';

export const notificationService = {
  getMyNotifications: async (params = {}) => {
    return await axiosClient.get('/notifications/me', { params });
  },
  getAll: async () => {
    return await axiosClient.get('/notifications');
  },
  create: async (payload) => {
    return await axiosClient.post('/notifications', payload);
  },
  update: async (id, payload) => {
    return await axiosClient.put(`/notifications/${id}`, payload);
  },
  delete: async (id) => {
    return await axiosClient.delete(`/notifications/${id}`);
  },
  markAsRead: async (id) => {
    return await axiosClient.post(`/notifications/${id}/read`);
  },
};