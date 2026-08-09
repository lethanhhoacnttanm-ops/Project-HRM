import axiosClient from '../config/axios';

export const employeeService = {
  getAllEmployees: async (page, limit, role, status) => { 
    return await axiosClient.get('/employees', {
      params: {
        page: page,
        limit: limit,
        role: role,
        status: status
      },
    });
  },

  updateEmployee: async (id, payload) => {
    return await axiosClient.put(`/employees/${id}`, payload);
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