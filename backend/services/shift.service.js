import shiftRepository from '../repositories/shift.repository.js';
import ShiftModel from '../models/Shift.js';

class ShiftService {
  async createShift(data) {
    const { name, code, checkInTime, checkOutTime, breakTime } = data;


    let status = 'Đang áp dụng';
    if (checkInTime.includes('10:00 PM') || checkInTime.includes('09:00 PM') || checkInTime.includes('11:00 PM') || checkInTime.includes('22:00')) {
      status = 'Xoay ca';
    }

    const tempShift = new ShiftModel({
      name,
      code,
      checkInTime,
      checkOutTime,
      breakTime,
      status
    });

    const appliedCount = await shiftRepository.countAppliedEmployees(tempShift._id, code);
    tempShift.appliedEmployeesCount = appliedCount;

    const savedShift = await shiftRepository.create(tempShift);

    return {
      success: true,
      data: savedShift
    };
  }

  async getAllShift({ page, limit }) {
    const pageNumber = Math.max(1, parseInt(page, 10) || 1);
    const pageSize = Math.max(1, parseInt(limit, 10) || 8);
    const skip = (pageNumber - 1) * pageSize;

    const { totalShift, dataShift } = await shiftRepository.FindWithPagination({
      skip,
      limit: pageSize
    });


    if (totalShift === undefined || dataShift === undefined) {
      throw new Error("Lỗi trường hợp lệ trong phân trang");
    }

    return {
      dataShift,
      pagination: {
        totalShift,
        pageNumber,
        pageSize,
        totalPage: Math.ceil(totalShift / pageSize)
      }
    };
  }
}

export default new ShiftService();