import axiosClient from '../config/axios.js';

export const reportService = {
  getMyReport: async (params = {}) => {
    return await axiosClient.get('/reports/me', { params });
  },
};