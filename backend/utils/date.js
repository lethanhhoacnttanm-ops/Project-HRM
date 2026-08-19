import dayjs from "dayjs";

export const dateUtils = {
  formatDateOfBirth: (dateString) => {
    if (!dateString) return null;
    return dayjs(dateString).startOf('day').toDate(); 
  }
}


export const calculateGradeTenure = (startDate, endDate = new Date()) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return 0; 
  }

  const diffTime = end - start;

  if (diffTime < 0) {
    return 0;
  }

  const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);

  return Number(diffYears.toFixed(1));
};

export const formatDate = (dateInput) => {
  return new Date(dateInput);
};

