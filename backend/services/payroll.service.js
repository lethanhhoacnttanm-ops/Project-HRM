import payrollRepository from '../repositories/payroll.repository.js';
import ContractModel from '../models/Contract.js';
import budgetService from './budget.service.js';
import PayrollModel from '../models/Payroll.js';
const calculateNetSalary = (baseSalary, allowance, bonus, deductions) => {
  const net = Number(baseSalary || 0) + Number(allowance || 0) + Number(bonus || 0) - Number(deductions || 0);
  return net > 0 ? net : 0;
};

class PayrollService {

  async getAllPayrollsWithoutPagination() {
    return await payrollRepository.findAllWithoutPagination();
  }

  async toggleLock(id, isLocked) {
    const existingPayroll = await payrollRepository.findById(id);
    if (!existingPayroll) {
      throw new Error("Không tìm thấy phiếu lương!");
    }

    const updatedPayroll = await payrollRepository.updateClock(id, { isLocked });
    return updatedPayroll;
  }

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

  async getPayrollsByMonth(monthYear) {
    return await payrollRepository.findByMonthYear(monthYear);
  }

  async createPayroll(data) {
    const contract = await ContractModel.findById(data.contract);
    if (!contract) throw new Error("Không tìm thấy hợp đồng áp dụng!");

    if (!contract.employee) {
      throw new Error("Hợp đồng này không liên kết với nhân viên nào!");
    }

    const baseSalary = contract.salary || 0;
    const netSalary = calculateNetSalary(baseSalary, data.allowance, data.bonus, data.deductions);

    const payload = {
      ...data,
      employee: contract.employee,
      baseSalary,
      netSalary,
    };

    return await payrollRepository.create(payload);
  }

  async updatePayroll(id, data) {
    const existingPayroll = await payrollRepository.findById(id);
    if (!existingPayroll) throw new Error("Không tìm thấy phiếu lương!");

    if (existingPayroll.isLocked) {
      throw new Error("Phiếu lương đã bị khóa, không thể chỉnh sửa!");
    }

    let employeeId = existingPayroll.employee;
    let baseSalary = existingPayroll.baseSalary;

    if (data.contract && data.contract !== existingPayroll.contract?.toString()) {
      const newContract = await ContractModel.findById(data.contract);
      if (!newContract) throw new Error("Hợp đồng mới không tồn tại!");

      employeeId = newContract.employee;
      baseSalary = newContract.salary || 0;
    }
    const allowance = data.allowance !== undefined ? data.allowance : existingPayroll.allowance;
    const bonus = data.bonus !== undefined ? data.bonus : existingPayroll.bonus;
    const deductions = data.deductions !== undefined ? data.deductions : existingPayroll.deductions;

    const netSalary = calculateNetSalary(baseSalary, allowance, bonus, deductions);

    const updateData = {
      ...data,
      employee: employeeId,
      baseSalary,
      allowance: Number(allowance) || 0,
      bonus: Number(bonus) || 0,
      deductions: Number(deductions) || 0,
      netSalary,
    };

    return await payrollRepository.update(id, updateData);
  }

  async lockMonthPayrolls(monthYear, adminId) {
    const payrolls = await payrollRepository.findByMonthYear(monthYear);
    if (!payrolls || payrolls.length === 0) {
      throw new Error(`Không tìm thấy dữ liệu phiếu lương của tháng ${monthYear} để chốt!`);
    }

    const alreadyLocked = payrolls.every(p => p.isLocked === true && p.status === "Đã chốt");
    if (alreadyLocked) {
      throw new Error(`Bảng lương tháng ${monthYear} đã được chốt từ trước đó rồi!`);
    }

    return await PayrollModel.updateMany(
      { monthYear: monthYear },
      {
        $set: {
          isLocked: true,
          status: "Đã chốt",
          lockedAt: new Date(),
          lockedBy: adminId
        }
      }
    );
  }
}

export default new PayrollService();