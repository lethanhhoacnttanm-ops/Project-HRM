import axiosClient from '../config/axios';

export const employeeService = {
  getAllEmployees: async (page, limit, role, status) => {
    return await axiosClient.get('/employees', {
      params: { page, limit, role, status },
    });
  },

  getAllListEmp: async () => {
    return await axiosClient.get('/employees/all-list-v1')
  },

  getAllDataEmp: async (role) => {
    return await axiosClient.get('/employees/allListData', {
      params: { role },
    })
  },

  getAllDataEmpForBenefit: async (role) => {
    return await axiosClient.get('/employees/allListDataForBenefit', {
      params: { role },
    })
  },


  register: async (registerData) => {
    return await axiosClient.post('/employees/register', registerData);
  },

  assignEmployee: async (payload) => {
    return await axiosClient.put('/employees/assign-department', payload);
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