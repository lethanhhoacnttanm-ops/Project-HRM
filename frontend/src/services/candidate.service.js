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
    return await axiosClient.put(`/candidates/${candidateId}/stage`, { stage: newStage });
  },

  getCandidatesNoPaging: async () => {
    return await axiosClient.get('/candidates/all-no-pagination');
  },

  getMyApplications: async () => {
    return await axiosClient.get('/candidates/my-applications');
  }
};

export default candidateService;