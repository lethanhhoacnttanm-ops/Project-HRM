import budgetService from "../services/budget.service.js";

class BudgetController {
  async getRealtimeStats(req, res) {
    try {
      const { monthYear } = req.query; 
      const data = await budgetService.getRealtimeStats(monthYear);

      return res.status(200).json({
        success: true,
        data
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Lỗi server: " + error.message
      });
    }
  }

  async upsertBudget(req, res) {
    try {
      const updatedBudget = await budgetService.updateBudget(req.body);

      return res.status(200).json({
        success: true,
        message: "Cập nhật ngân sách thành công!",
        data: updatedBudget
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Lỗi server: " + error.message
      });
    }
  }
}

export default new BudgetController();