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
};