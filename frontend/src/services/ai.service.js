import axiosClient from '../config/axios.js';

export const aiService = {
  async sendMessage(payload) {
    try {
      const body = typeof payload === 'string' ? { message: payload } : payload;
      const data = await axiosClient.post('/chatbot/ai/chat', body);
      return data; 
    } catch (error) {
      console.error('Lỗi khi gọi AI service:', error);
      throw error;
    }
  },
  async assist(payload) {
    return await axiosClient.post('/ai/assist', payload);
  },
};