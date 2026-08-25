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
}

export default new LeaveService();
