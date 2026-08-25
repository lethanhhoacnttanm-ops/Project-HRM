
export const formatVND = (amount) => {
  if (amount === null || amount === undefined || isNaN(amount)) return '0 ₫';
  
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(Number(amount));
};
export const formatNumberSeparator = (value) => {
  if (!value && value !== 0) return '';
  const stringValue = String(value).replace(/\D/g, '');
  if (!stringValue) return '';
  
  return stringValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export const parseNumber = (formattedValue) => {
  if (!formattedValue) return 0;
  const cleanString = String(formattedValue).replace(/\./g, '');
  return Number(cleanString) || 0;
};