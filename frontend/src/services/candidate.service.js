import axiosClient from "@/config/axios";

const candidateService = {
  applyJob: async (applicationData) => {
    try {
      const response = await axiosClient.post('candidates/apply', applicationData);
      return response.data; 
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getCandidatesByJobId: async (jobId) => {
    try {
      const response = await axiosClient.get(`/candidates/job/${jobId}`);
      console.log("Dữ liệu gốc từ Backend trả về:", response.data);
      return response.data; 
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default candidateService;