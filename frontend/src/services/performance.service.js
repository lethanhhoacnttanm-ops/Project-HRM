import axiosClient from "@/config/axios";

export const performanceService = {
  getMyEvaluations: async () => {
    return await axiosClient.get('/performances/me');
  },

  getMyEvaluationDetail: async (id) => {
    return await axiosClient.get(`/performances/me/${id}`);
  },

  createPerformanceApi: async (performanceData) => {
    return await axiosClient.post('/performances', performanceData);
  },

  FindWithPagination: async (page, limit) => {
    return await axiosClient.get('/performances', {
      params: { page, limit },
    });
  },

  getTeamPerformanceSummary: async () => {
    return await axiosClient.get('/performances/team-summary');
  },

  createCycleApi: async (quarter) => {
    return await axiosClient.post('/performances/cycle', { quarter });
  },

  getMyReviewApi: async (quarter) => {
    return await axiosClient.get(`/performances/my-review?quarter=${quarter}`);
  },

  submitSelfApi: async (payload) => {
    return await axiosClient.put(`/performances/submit-self`, payload);
  }
};