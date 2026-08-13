import payrollRepository from '../repositories/payroll.repository.js';

class PayrollService {
  async getMyPayrolls(employeeId) {
    return await payrollRepository.findByEmployeeId(employeeId);
  }

  async getMyPayrollById(employeeId, payrollId) {
    const payroll = await payrollRepository.findByIdForEmployee(
      payrollId,
      employeeId
    );
    if (!payroll) {
      throw new Error('Không tìm thấy phiếu lương!');
    }
    return payroll;
  }
}

export default new PayrollService();