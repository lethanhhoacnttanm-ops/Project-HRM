import axiosClient from '../config/axios';

export const employeeService = {
  getAllEmployees: async () => {
    return await axiosClient.get('/allemployees');
  },
};