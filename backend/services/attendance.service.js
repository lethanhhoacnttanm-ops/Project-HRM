import attendanceRepository from '../repositories/attendance.repository.js';

class AttendanceService {
  async getMyAttendance(employeeId, query = {}) {
    const { month, year } = query;
    return await attendanceRepository.findByEmployeeId(employeeId, {
      month,
      year,
    });
  }
}

export default new AttendanceService();