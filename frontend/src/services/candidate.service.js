import axiosClient from "@/config/axios";

const candidateService = {
  applyJob: async (payload) => {
    return await axiosClient.post('/candidates/apply', payload);
  },

  getCandidates: async (jobId) => {
    const url = jobId ? `/candidates?jobId=${jobId}` : '/candidates';
    return await axiosClient.get(url);
  },

  updateCandidateStage: async (candidateId, newStage) => {
    try {
      const response = await axiosClient.put(`/candidates/${candidateId}/stage`, { stage: newStage });
      return response;
    } catch (err) {
      console.error("Axios request lỗi:", err.response || err);
      throw err;
    }
  },

  getCandidatesNoPaging: async () => {
    return await axiosClient.get('/candidates/all-no-pagination');
  },
};

export default candidateService;