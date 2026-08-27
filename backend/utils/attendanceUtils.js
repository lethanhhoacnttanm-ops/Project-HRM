export const timeToMinutes = (timeStr) => {
  if (!timeStr || timeStr === '--:--') return 0;
  const [time, modifier] = timeStr.split(' ');
  let [hours, minutes] = time.split(':').map(Number);

  if (modifier === 'PM' && hours < 12) hours += 12;
  if (modifier === 'AM' && hours === 12) hours = 0;

  return hours * 60 + minutes;
};

export const evaluateCheckInStatus = (actualCheckIn, shiftCheckInTime) => {
  const actualMinutes = timeToMinutes(actualCheckIn);
  const shiftMinutes = timeToMinutes(shiftCheckInTime);

  const allowedLateMinutes = 5; 

  if (actualMinutes > shiftMinutes + allowedLateMinutes) {
    return { status: 'Đi muộn', isCheckInLate: true };
  }
  return { status: 'Đúng giờ', isCheckInLate: false };
};

export const calculateTotalHours = (checkInStr, checkOutStr) => {
  const inMinutes = timeToMinutes(checkInStr);
  const outMinutes = timeToMinutes(checkOutStr);

  let diffMinutes = outMinutes - inMinutes;
  
  if (diffMinutes < 0) {
    diffMinutes += 24 * 60; 
  }

  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;

  return `${hours}h ${minutes < 10 ? '0' : ''}${minutes}m`;
};