import AttendanceModel from '../models/Attendance.js';

class AttendanceRepository {
  async findByEmployeeId(employeeId, { month, year } = {}) {
    const filter = { employee: employeeId };

    if (month && year) {
      const start = new Date(Number(year), Number(month) - 1, 1);
      const end = new Date(Number(year), Number(month), 0, 23, 59, 59, 999);
      filter.date = { $gte: start, $lte: end };
    }

    return await AttendanceModel.find(filter)
      .sort({ date: -1 })
      .lean();
  }
}

export default new AttendanceRepository();