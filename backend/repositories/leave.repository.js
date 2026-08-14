import LeaveModel from '../models/Leave.js';

class LeaveRepository {
  async findByEmployeeId(employeeId) {
    return await LeaveModel.find({ employee: employeeId })
      .sort({ createdAt: -1 })
      .lean();
  }

  async create(data) {
    return await LeaveModel.create(data);
  }
}

export default new LeaveRepository();