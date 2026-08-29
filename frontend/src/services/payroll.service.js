import axiosClient from '../config/axios.js';

export const payrollService = {
  getMyPayrolls: async () => {
    return await axiosClient.get('/payrolls/me');
  },

  getMyPayrollDetail: async (id) => {
    return await axiosClient.get(`/payrolls/me/${id}`);
  },

  getPayrollsApi: async (monthYear) => {
    return await axiosClient.get(`/payrolls?monthYear=${monthYear}`);
  },

  createPayrollApi: async (payload) => {
    return await axiosClient.post('/payrolls', payload);
  },

  updatePayrollApi: async (id, payload) => {
    return await axiosClient.put(`/payrolls/${id}`, payload);
  },

  toggleLockApi: async (id, isLocked) => {
    const response = await axiosClient.put(`/payrolls/${id}/lock`, { isLocked: Boolean(isLocked) });
    return response.data;
  },

  lockMonthApi: async (monthYear) => {
    const response = await api.put(`/payrolls/lock-month`, { monthYear });
    return response.data;
  }
};