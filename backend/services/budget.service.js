import budgetRepository from "../repositories/budget.repository.js";

const getCurrentMonthYear = () => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  return `${month}-${year}`;
};

class BudgetService {
  async getRealtimeStats(queryMonth) {
    const targetMonth = queryMonth || getCurrentMonthYear();

    const budget = await budgetRepository.findByMonthYear(targetMonth);
    const totalAllocatedBudget = budget ? budget.totalAllocatedBudget : 0;

    const payrolls = await budgetRepository.getPayrollsByMonth(targetMonth);
    const totalSpent = payrolls.reduce((acc, curr) => acc + (curr.netSalary || 0), 0);

    const remainingBudget = totalAllocatedBudget - totalSpent;
    const isOverBudget = totalSpent > totalAllocatedBudget;

    return {
      monthYear: targetMonth,
      totalPayroll: totalAllocatedBudget, 
      totalSpent,
      remainingBudget,
      isOverBudget,
      note: budget ? budget.note : "Chưa thiết lập ngân sách tháng này"
    };
  }

  async updateBudget(data) {
    const { monthYear, totalAllocatedBudget, note } = data;
    const targetMonth = monthYear || getCurrentMonthYear();
    return await budgetRepository.upsertBudget(targetMonth, totalAllocatedBudget, note);
  }
}

export default new BudgetService();