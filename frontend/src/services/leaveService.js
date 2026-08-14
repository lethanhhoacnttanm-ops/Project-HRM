import axiosClient from '../config/axios.js';

export const leaveService = {
  getMyLeaves: async () => {
    return await axiosClient.get('/leaves/me');
  },

  createLeave: async (payload) => {
    return await axiosClient.post('/leaves/me', payload);
  },
};