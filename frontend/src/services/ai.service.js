import axiosClient from '../config/axios.js';

export const aiService = {
  async sendMessage(message) {
    try {
      const data = await axiosClient.post('/chatbot/ai/chat', { message });
      return data; 
    } catch (error) {
      console.error('Lỗi khi gọi AI service:', error);
      throw error;
    }
  },
};