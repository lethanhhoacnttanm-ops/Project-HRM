export const generateShiftCode = (name) => {
  if (!name) return "SHIFT-001";
  const slug = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "-");
  return `SH-${slug}-${Math.floor(100 + Math.random() * 900)}`;
};