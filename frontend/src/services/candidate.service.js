import axiosClient from "@/config/axios";

const candidateService = {
  applyJob: async (payload) => {
    return await axiosClient.post('/candidates/apply', payload);
  },

  getCandidates: async (jobId) => {
    const url = jobId ? `/candidates?jobId=${jobId}` : '/candidates';
    return await axiosClient.get(url);
  },
};

export default candidateService;