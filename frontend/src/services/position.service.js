import axiosClient from '../config/axios';

export const positionService = {
  createPosition: async (dataPosition) => { 
    return await axiosClient.post('/positions', dataPosition);
  },

  getAllList: async () => {
    return await axiosClient.get('/positions')
  }
};