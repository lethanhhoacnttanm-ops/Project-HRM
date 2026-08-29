import attendanceRepository from '../repositories/attendance.repository.js';
import { evaluateCheckInStatus, calculateTotalHours } from '../utils/attendanceUtils.js';
import ShiftModel from '../models/Shift.js';


const timeToMinutes = (timeStr) => {
  if (!timeStr || timeStr === '--:--' || timeStr.trim() === '') return null;
  const parts = timeStr.trim().split(' ');
  const timePart = parts[0];
  const modifier = parts[1] ? parts[1].toUpperCase() : '';
  let [hours, minutes] = timePart.split(':').map(Number);

  if (modifier === 'AM' && hours === 12) hours = 0;
  if (modifier === 'PM' && hours !== 12) hours += 12;

  return hours * 60 + minutes;
};

class AttendanceService {
  async getMyAttendance(employeeId, query = {}) {
    const { month, year } = query;
    return await attendanceRepository.findByEmployeeId(employeeId, {
      month,
      year,
    });
  }

  async getEmployeeTodayStatus(employeeId) {
    const record = await attendanceRepository.getTodayRecord(employeeId);
    return record;
  }

  async checkOutEmployee(employeeId, payload) {
    const { checkOut } = payload;

    const attendanceRecord = await attendanceRepository.findActiveAttendanceToday(employeeId);
    if (!attendanceRecord) {
      throw new Error("Không tìm thấy ca làm việc nào đang mở hoặc bạn chưa Check-in hôm nay!");
    }

    const totalHours = calculateTotalHours(attendanceRecord.checkIn, checkOut);

    attendanceRecord.checkOut = checkOut;
    attendanceRecord.totalHours = totalHours;

    await attendanceRecord.save();
    return attendanceRecord;
  }


  async checkInEmployee(employeeId, bodyData) {
    const shiftId = bodyData.shift; 
    const { checkIn, date } = bodyData;

    if (!shiftId) {
      throw new Error("Vui lòng chọn ca làm việc!");
    }

    const shift = await ShiftModel.findById(shiftId);
    if (!shift) {
      throw new Error("Không tìm thấy ca làm việc!");
    }

    let status = 'Đúng giờ';
    const standardCheckInMin = timeToMinutes(shift.checkInTime);
    const actualCheckInMin = timeToMinutes(checkIn);

    if (standardCheckInMin && actualCheckInMin !== null && actualCheckInMin > standardCheckInMin) {
      status = 'Đi muộn';
    }

    const attendanceData = {
      employee: employeeId,
      shift: shiftId,
      date: date || new Date(),
      checkIn: checkIn || '--:--',
      checkOut: '--:--',
      totalHours: 'Đang làm',
      status,
    };

    const result = await attendanceRepository.createAttendanceWithCount(attendanceData, shiftId);
    return result;
  }

  async getAllAttendance({ page, limit }) {
    const pageNumber = Math.max(1, parseInt(page, 10) || 1);
    const pageSize = Math.max(1, parseInt(limit, 10) || 8);
    const skip = (pageNumber - 1) * pageSize;

    const { totalAttendance, dataAttendance } = await attendanceRepository.FindWithPagination({
      skip,
      limit: pageSize
    });


    if (totalAttendance === undefined || dataAttendance === undefined) {
      throw new Error("Lỗi trường hợp lệ trong phân trang");
    }

    return {
      dataAttendance,
      pagination: {
        totalAttendance,
        pageNumber,
        pageSize,
        totalPage: Math.ceil(totalAttendance / pageSize)
      }
    };
  }

  timeToMinutes(timeStr) {
    if (!timeStr || timeStr === '--:--' || timeStr.trim() === '') return null;
    const parts = timeStr.trim().split(' ');
    const timePart = parts[0];
    const modifier = parts[1] ? parts[1].toUpperCase() : '';
    let [hours, minutes] = timePart.split(':').map(Number);

    if (modifier === 'AM' && hours === 12) hours = 0;
    if (modifier === 'PM' && hours !== 12) hours += 12;

    return hours * 60 + minutes;
  };

  async processCheckInService (payload) {
    const { employeeId, shiftId, checkIn, checkOut, date } = payload;

    const shift = await shiftRepository.findById(shiftId);
    if (!shift) throw new Error('Không tìm thấy ca làm việc');

    let status = 'Đúng giờ';
    const standardCheckInMin = timeToMinutes(shift.checkInTime);
    const actualCheckInMin = timeToMinutes(checkIn);

    if (standardCheckInMin && actualCheckInMin > standardCheckInMin) {
      status = 'Đi muộn';
    }

    const attendanceData = {
      employee: employeeId,
      shift: shiftId,
      date,
      checkIn: checkIn || '--:--',
      checkOut: checkOut || '--:--',
      status,
    };

    const newAttendance = await attendanceRepository.createAttendance(attendanceData, shiftId);
    return newAttendance;
  };

}

export default new AttendanceService();