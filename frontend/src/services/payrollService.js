import axiosClient from '../config/axios.js';

export const payrollService = {
  getMyPayrolls: async () => {
    return await axiosClient.get('/payrolls/me');
  },

  getMyPayrollDetail: async (id) => {
    return await axiosClient.get(`/payrolls/me/${id}`);
  },
};