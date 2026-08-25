import axiosClient from "@/config/axios";

const jobService = {
  getAllJobs: async (page, limit) => {
    return await axiosClient.get('/jobs', {
      params: { page, limit},
    });
  },

  createJob: async (jobData) => {
    const response = await axiosClient.post('/jobs', jobData);
    return response.data; 
  },

  getJobDetailsForApproval: async (jobId) => {
    try {
      const response = await axiosClient.get(`/jobs/${jobId}/for-approval`);
      console.log("Dữ liệu gốc từ Backend trả về:", response.data);
      return response.data; 
    } catch (error) {
      console.error("Lỗi Axios gọi API:", error.response?.data || error.message);
      throw error;
    }
  },
};

export default jobService;