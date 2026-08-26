import axiosClient from "@/config/axios";

const shiftService = {
  createShift: async (data) => {
    return await axiosClient.post('/shifts', data);
  },
  getAllShift: async (page, limit) => {
    return await axiosClient.get('/shifts', {
      params: { page, limit },
    });
  },
};

export default shiftService;