import axiosClient from '../config/axios';

export const employeeService = {
  getAllEmployees: async (page, limit, role) => { 
    return await axiosClient.get('/employees', {
      params: {
        page: page,
        limit: limit,
        role: role,
      },
    });
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