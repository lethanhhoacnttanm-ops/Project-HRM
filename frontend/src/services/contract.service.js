import axiosClient from "../config/axios.js";

export const contractService = {
  createNewContract: async (employeeId, payload) => { 
    const dataToSend = {
      ...payload,
      employee: employeeId 
    };

    console.log("🚀 Dữ liệu CHUẨN BỊ BAY LÊN SERVER:", dataToSend);

    return await axiosClient.post('/contracts', dataToSend);
  },
};