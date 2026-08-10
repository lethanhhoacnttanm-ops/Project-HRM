import axiosClient from "../config/axios.js";

export const contractService = {
  createNewContract: async (employeeId, payload) => { 
    const dataToSend = {
      ...payload,
      employee: employeeId 
    };
    return await axiosClient.post('/contracts', dataToSend);
  },

  getallContractEmployee: async (page, limit) => {
     return await axiosClient.get('/contracts/allContract', {
       params: {
        page: page,
        limit: limit
      },
     })
  }
};