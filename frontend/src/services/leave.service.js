import axiosClient from '../config/axios.js';

export const leaveService = {
  getMyLeaves: async () => {
    return await axiosClient.get('/leaves/me');
  },

  getLeavesNoPaging: async () => {
    return await axiosClient.get('/leaves/all-no-pagination');
  },

  createLeave: async (payload) => {
    return await axiosClient.post('/leaves/me', payload);
  },

  FindWithPagination: async (page, limit) => {
    return await axiosClient.get('/leaves', {
      params: { page, limit },
    });
  },

  updateLeaveStatus: async (id, status) => {
      return await axiosClient.put(`/leaves/${id}/status`, { status });
  },
};