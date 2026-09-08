import axiosClient from '../config/axios.js';

export const systemConfigService = {
  getConfig: async () => {
    return await axiosClient.get('/system-config');
  },

  updateConfig: async (data) => {
    return await axiosClient.post('/system-config', data);
  }
};