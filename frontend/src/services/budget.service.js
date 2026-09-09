import axiosClient from "@/config/axios";

const getCurrentMonthYear = () => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  return `${month}-${year}`;
};

export const budgetServiceFE = {
  getRealtimeStats: async (monthYear = getCurrentMonthYear()) => {
    return await axiosClient.get(`/budgets/realtime-stats?monthYear=${monthYear}`);
  },

  upsertBudget: async (payload) => {
    return await axiosClient.post('/budgets/upsert', payload);
  }
};