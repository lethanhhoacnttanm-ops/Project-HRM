import axiosClient from '../config/axios';

export const departmentService = {
  createDepartment: async (formdata) => { 
    return await axiosClient.post('/departments', formdata);
  },
  getAllList: async () => {
    return await axiosClient.get('/departments')
  }
};