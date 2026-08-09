
export const contractUtils = {
  generateContractCode: () => {
    const year = new Date().getFullYear();
    const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `HĐ-${year}-${randomStr}`;
  },

  formatVND: (amount) => {
    if (!amount || isNaN(amount)) return '0 đ';
    
    const formatted = new Intl.NumberFormat('vi-VN').format(amount);
    return `${formatted} đ`; 
  }
};