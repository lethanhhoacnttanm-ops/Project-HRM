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
}

export default new PayrollRepository();