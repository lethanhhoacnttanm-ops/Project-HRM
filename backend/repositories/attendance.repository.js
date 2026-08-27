import AttendanceModel from '../models/Attendance.js';
import ShiftModel from '../models/Shift.js';

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

  async FindWithPagination({ skip, limit }) {
    const [totalAttendance, dataAttendance] = await Promise.all([
      AttendanceModel.countDocuments(),
      AttendanceModel.find().populate({
        path: 'employee',
        select: 'fullName code avatarUrl' 
      }).populate({
        path: 'shift',
        select: 'name' 
      }).skip(skip).limit(limit).sort({ createdAt: -1 }).lean()
    ])

    return { totalAttendance, dataAttendance }
  }

  async createAttendance(data) {
    return await AttendanceModel.create(data);
  }

  async findShiftById(shiftId) {
    return await ShiftModel.findById(shiftId);
  }

  async findTodayByEmployee(employeeId, date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return await AttendanceModel.findOne({
      employee: employeeId,
      date: { $gte: startOfDay, $lte: endOfDay }
    });
  }

  async findActiveAttendanceToday(employeeId) {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    return await AttendanceModel.findOne({
      employee: employeeId,
      date: { $gte: startOfDay, $lte: endOfDay },
      checkOut: '--:--'
    }).populate('shift');
  }

  async getTodayRecord(employeeId) {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    return await AttendanceModel.findOne({
      employee: employeeId,
      date: { $gte: startOfDay, $lte: endOfDay }
    }).populate('shift');
  }
}

export default new AttendanceRepository();