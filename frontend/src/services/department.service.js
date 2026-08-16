import axiosClient from '../config/axios';

export const departmentService = {
  createDepartment: async (formdata) => {
    return await axiosClient.post('/departments', formdata);
  },
  getAllList: async () => {
    return await axiosClient.get('/departments')
  },
  updateManagerForDepartment: async (payload) => {
    return await axiosClient.put('/departments/new-manager', payload)
  },
};