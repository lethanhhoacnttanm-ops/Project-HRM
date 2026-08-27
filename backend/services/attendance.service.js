import attendanceRepository from '../repositories/attendance.repository.js';
import { evaluateCheckInStatus, calculateTotalHours } from '../utils/attendanceUtils.js';

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

  async checkInEmployee(employeeId, payload) {
    const { shift: shiftId, date, checkIn } = payload;

    const existingAttendance = await attendanceRepository.findTodayByEmployee(employeeId, date);
    if (existingAttendance) {
      throw new Error("Bạn đã thực hiện chấm công trong ngày hôm nay rồi!");
    }

    const shiftInfo = await attendanceRepository.findShiftById(shiftId);
    if (!shiftInfo) {
      throw new Error("Ca làm việc không tồn tại hoặc đã bị xóa!");
    }

    const { status, isCheckInLate } = evaluateCheckInStatus(checkIn, shiftInfo.checkInTime);

    const attendanceData = {
      employee: employeeId,
      shift: shiftId,
      date: new Date(date),
      checkIn: checkIn,
      checkOut: '--:--',
      totalHours: 'Đang làm',
      status: status,
      isCheckInLate: isCheckInLate,
    };

    const savedAttendance = await attendanceRepository.createAttendance(attendanceData);
    return savedAttendance;
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
}

export default new AttendanceService();