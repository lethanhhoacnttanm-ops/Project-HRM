import axiosClient from '../config/axios';

export const employeeService = {
  getAllEmployees: async (page, limit, role, status) => {
    return await axiosClient.get('/employees', {
      params: { page, limit, role, status },
    });
  },

  updateEmployee: async (id, payload) => {
    return await axiosClient.put(`/employees/${id}`, payload);
  },

  getMyProfile: async () => {
    return await axiosClient.get('/employees/me');
  },

  updateMyProfile: async (data) => {
    return await axiosClient.put('/employees/me', data);
  },

  changePassword: async (data) => {
    return await axiosClient.put('/employees/me/password', data);
  },
};