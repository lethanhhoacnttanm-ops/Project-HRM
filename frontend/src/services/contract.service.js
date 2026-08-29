import axiosClient from '../config/axios.js';

export const contractService = {
  createNewContract: async (employeeId, payload) => {
    const dataToSend = {
      ...payload,
      employee: employeeId,
    };
    return await axiosClient.post('/contracts', dataToSend);
  },

  getallContractEmployee: async (page, limit) => {
    return await axiosClient.get('/contracts/allContract', {
      params: { page, limit },
    });
  },

  getListContract: async () => {
    return await axiosClient.get('/contracts/listContract')
  },

  getMyContracts: async () => {
    return await axiosClient.get('/contracts/me');
  },
};