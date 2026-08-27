import axiosClient from '../config/axios.js';

export const internalJobService = {
  getOpenJobs: async () => {
    return await axiosClient.get('/internal-jobs');
  },

  getJobDetail: async (id) => {
    return await axiosClient.get(`/internal-jobs/${id}`);
  },

  apply: async (payload) => {
    return await axiosClient.post('/internal-jobs/apply', payload);
  },

  getMyApplications: async () => {
    return await axiosClient.get('/internal-jobs/my-applications');
  },
};