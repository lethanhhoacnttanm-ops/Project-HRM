import PayrollModel from '../models/Payroll.js';

class PayrollRepository {
  async findByEmployeeId(employeeId) {
    return await PayrollModel.find({ employee: employeeId })
      .sort({ monthYear: -1 })
      .lean();
  }

  async findByEmployeeAndMonth(employeeId, monthYear) {
    return await PayrollModel.findOne({
      employee: employeeId,
      monthYear,
    }).lean();
  }

  async findByIdForEmployee(payrollId, employeeId) {
    return await PayrollModel.findOne({
      _id: payrollId,
      employee: employeeId,
    }).lean();
  }

  async findByMonthYear(monthYear) {
    return await PayrollModel.find({ monthYear })
      .populate('employee', 'fullName code avatarUrl')
      .populate('contract', 'contractCode type salary')
      .sort({ createdAt: -1 })
      .lean();
  }

  async updateManyByMonthYear(monthYear, updateData) {
    return await PayrollModel.updateMany(
      { monthYear },
      { $set: updateData }
    );
  }

  async findById(id) {
    return await PayrollModel.findById(id);
  }

  async create(data) {
    const payroll = await PayrollModel.create(data);
    return await PayrollModel.findById(payroll._id)
      .populate('employee', 'fullName code avatarUrl')
      .populate('contract', 'contractCode type salary');
  }

  async update(id, data) {
    return await PayrollModel.findByIdAndUpdate(id, data, { new: true })
      .populate('employee', 'fullName code avatarUrl')
      .populate('contract', 'contractCode type salary');
  }

  async updateClock(id, updateData) {
    return await PayrollModel.findByIdAndUpdate(
      id, 
      { $set: updateData }, 
      { new: true }
    );
  }
}

export default new PayrollRepository();