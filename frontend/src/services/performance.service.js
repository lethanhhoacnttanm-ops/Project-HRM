import axiosClient from '../config/axios.js';

export const performanceService = {
  getMyEvaluations: async () => {
    return await axiosClient.get('/performances/me');
  },

  getMyEvaluationDetail: async (id) => {
    return await axiosClient.get(`/performances/me/${id}`);
  },
};