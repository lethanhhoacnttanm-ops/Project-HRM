import PerformanceModel from '../models/Performance.js';

class PerformanceRepository {
  async findByEmployeeId(employeeId) {
    return await PerformanceModel.find({ employee: employeeId })
      .populate('evaluator', 'fullName email code')
      .sort({ createdAt: -1 })
      .lean();
  }

  async findByIdForEmployee(id, employeeId) {
    return await PerformanceModel.findOne({
      _id: id,
      employee: employeeId,
    })
      .populate('evaluator', 'fullName email code')
      .lean();
  }
}

export default new PerformanceRepository();