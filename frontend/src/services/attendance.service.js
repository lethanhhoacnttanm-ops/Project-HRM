import axiosClient from '../config/axios.js';

export const attendanceService = {
  getMyAttendance: async (params = {}) => {
    return await axiosClient.get('/attendances/me', { params });
  },
};