import ShiftModel from "../models/Shift.js";
import AttendanceModel from "../models/Attendance.js";

class ShiftRepository {
  async create(shiftData) {
    return await ShiftModel.create(shiftData);
  }

  async countAppliedEmployees(shiftId, shiftCode) {
    const attendances = await AttendanceModel.find({
      $or: [{ shift: shiftId }, { shiftCode: shiftCode }]
    }).distinct('employee');

    return attendances.length;
  }

  async FindWithPagination({ skip, limit }) {
    const [totalShift, dataShift] = await Promise.all([
      ShiftModel.countDocuments(),
      ShiftModel.find().skip(skip).limit(limit).lean()
    ])

    return { totalShift, dataShift }
  }
}

export default new ShiftRepository();