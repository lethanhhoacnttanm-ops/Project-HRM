import axiosClient from '../config/axios.js';

export const attendanceService = {
  getMyAttendance: async (params = {}) => {
    return await axiosClient.get('/attendances/me', { params });
  },
  FindWithPagination: async (page, limit) => {
    return await axiosClient.get('/attendances', {
      params: { page, limit },
    });
  },
  checkIn: async (data) => {
    return await axiosClient.post('/attendances', data);
  },
  getTodayStatus: async () => {
    return await axiosClient.get('/attendances/today-status');
  },
  checkOut: async (data) => {
    return await axiosClient.put('/attendances/checkout', data);
  },
};