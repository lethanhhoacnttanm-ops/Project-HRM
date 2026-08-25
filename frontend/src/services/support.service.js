import axiosClient from '../config/axios.js';

export const supportService = {
  getMyTickets: async () => axiosClient.get('/supports/me'),
  createTicket: async (payload) => axiosClient.post('/supports/me', payload),
};