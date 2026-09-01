import axiosClient from '../config/axios.js';

export const securityService = {
  getAuditLogs: async () => {
    return await axiosClient.get("/security/logs", { withCredentials: true });
  },
};