import axiosClient from '@/config/axios';

export const promotionService = {
  // Admin (giữ nguyên)
  createPromotion: async (formData) => {
    const response = await axiosClient.post('/promotions', formData);
    return response.data;
  },

  getAllPromotion: async (page, limit, status) => {
    return await axiosClient.get('/promotions', {
      params: { page, limit, status },
    });
  },

  updatePromotionStatus: async (promotionId, payload) => {
    return await axiosClient.put(`/promotions/${promotionId}/status`, payload);
  },

  // ===== Employee =====
  getMyPromotions: async () => {
    return await axiosClient.get('/promotions/me');
  },
};