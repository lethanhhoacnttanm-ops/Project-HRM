export const generateEmployeeCode = () => {
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `BT-${randomNum}`;
};