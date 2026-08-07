import axiosClient from '../config/axios';

export const employeeService = {
  getAllEmployees: async () => {
    return await axiosClient.get('/allemployees');
  },

  getMyProfile: async () => {
    return await axiosClient.get('/allemployees/me');
  },

  updateMyProfile: async (data) => {
    return await axiosClient.put('/allemployees/me', data);
  },

  changePassword: async (data) => {
    return await axiosClient.put('/allemployees/me/password', data);
  },
};