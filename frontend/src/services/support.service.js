import axiosClient from '../config/axios.js';

export const supportService = {
  create: async (data) => {
    return await axiosClient.post('/supports', data);
  },
  getMyTickets: async () => {
    return await axiosClient.get('/supports/my-tickets');
  },
  getTicketsNoPaging: async () => {
    return await axiosClient.get('/supports/all-no-pagination');
  },
  getAllTicketsForAdmin: async () => {
    return await axiosClient.get('/supports/admin/all');
  },
  updateTicketByAdmin: async (id, data) => {
    return await axiosClient.put(`/supports/admin/${id}`, data);
  },
};