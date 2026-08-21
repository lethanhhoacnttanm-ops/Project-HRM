import axiosClient from '../config/axios.js';

export const benefitService = {
  getMyBenefits: async (params = {}) => {
    return await axiosClient.get('/benefits/me', { params });
  },

  getBenefitDetail: async (id) => {
    return await axiosClient.get(`/benefits/me/${id}`);
  },
};