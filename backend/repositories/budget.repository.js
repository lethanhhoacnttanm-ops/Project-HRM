import CompanyBudgetModel from '../models/Budget.js';
import PayrollModel from '../models/Payroll.js';

class BudgetRepository {
  async findByMonthYear(monthYear) {
    return await CompanyBudgetModel.findOne({ monthYear });
  }

  async upsertBudget(monthYear, totalAllocatedBudget, note) {
    return await CompanyBudgetModel.findOneAndUpdate(
      { monthYear },
      { totalAllocatedBudget, note },
      { new: true, upsert: true, runValidators: true }
    );
  }

  async getPayrollsByMonth(monthYear) {
    return await PayrollModel.find({ monthYear });
  }
}

export default new BudgetRepository();