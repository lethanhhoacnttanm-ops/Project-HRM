import leaveRepository from '../repositories/leave.repository.js';

class LeaveService {
  async getMyLeaves(employeeId) {
    return await leaveRepository.findByEmployeeId(employeeId);
  }

  async createLeave(employeeId, payload) {
    const { leaveType, startDate, endDate, reason } = payload;

    if (!leaveType || !startDate || !endDate) {
      throw new Error('Vui lòng nhập đầy đủ loại nghỉ, ngày bắt đầu và ngày kết thúc!');
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end < start) {
      throw new Error('Ngày kết thúc phải sau hoặc bằng ngày bắt đầu!');
    }

    const diffTime = end.getTime() - start.getTime();
    const numberOfDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

    if (numberOfDays < 1) {
      throw new Error('Số ngày nghỉ không hợp lệ!');
    }

    const leave = await leaveRepository.create({
      employee: employeeId,
      leaveType,
      startDate: start,
      endDate: end,
      numberOfDays,
      reason: reason || '',
      status: 'Chờ duyệt',
    });

    return leave;
  }

  async getAllLeave({ page, limit }) {
    const pageNumber = Math.max(1, parseInt(page, 10) || 1);
    const pageSize = Math.max(1, parseInt(limit, 10) || 8);
    const skip = (pageNumber - 1) * pageSize;

    const { totalLeave, dataLeave } = await leaveRepository.FindWithPagination({
      skip,
      limit: pageSize
    });


    if (totalLeave === undefined || dataLeave === undefined) {
      throw new Error("Lỗi trường hợp lệ trong phân trang");
    }

    return {
      dataLeave,
      pagination: {
        totalLeave,
        pageNumber,
        pageSize,
        totalPage: Math.ceil(totalLeave / pageSize)
      }
    };
  }

  async updateLeaveStatus(id, status, currentAdminId) {
    const updateData = { 
      status: status,
      approvedBy: currentAdminId 
    };

    const updatedLeave = await leaveRepository.updateById(id, updateData);
    return updatedLeave;
  }
}

export default new LeaveService();
