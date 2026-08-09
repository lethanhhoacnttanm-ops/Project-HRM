import dayjs from "dayjs";

export const dateUtils = {
  formatDateOfBirth: (dateString) => {
    if (!dateString) return null;
    return dayjs(dateString).startOf('day').toDate(); 
  }
}