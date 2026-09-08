import axiosClient from '../config/axios.js';

export const benefitService = {

  getMyBenefitsNew: async () => {
    return await axiosClient.get('/benefits/my-benefits');
  },

  getBenefitsNoPaging: async () => {
    return await axiosClient.get('/benefits/all-no-pagination');
  },
  
  getMyBenefits: async (params = {}) => {
    return await axiosClient.get('/benefits/me', { params });
  },

  getBenefitDetail: async (id) => {
    return await axiosClient.get(`/benefits/me/${id}`);
  },

  createBenefit: async (benefitData) => {
    return await axiosClient.post('/benefits/create', benefitData);
  },

  getBenefits: async () => {
    return await axiosClient.get('/benefits'); 
  },

  updateBenefit: async (id, benefitData) => {
    return await axiosClient.put(`/benefits/update/${id}`, benefitData);
  },
  assignEmployees: async (id, payload) => {
    return await axiosClient.post(`/benefits/assign/${id}`, payload);
  },
  deleteBenefit: async (id) => {
    return await axiosClient.delete(`/benefits/delete/${id}`);
  },
};