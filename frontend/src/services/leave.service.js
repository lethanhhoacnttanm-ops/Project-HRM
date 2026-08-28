import axiosClient from '../config/axios.js';

export const leaveService = {
  getMyLeaves: async () => {
    return await axiosClient.get('/leaves/me');
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
    try {
      const response = await axiosClient.put(`/leaves/${id}/status`, { status });
      return response.data; 
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};