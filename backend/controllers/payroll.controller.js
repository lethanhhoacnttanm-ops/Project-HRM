import payrollService from '../services/payroll.service.js';

class PayrollController {
  async getMyPayrolls(req, res) {
    try {
      const data = await payrollService.getMyPayrolls(req.user.id);
      return res.status(200).json({
        success: true,
        message: 'Lấy danh sách phiếu lương thành công!',
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Lỗi khi lấy phiếu lương!',
      });
    }
  }

  async getMyPayrollDetail(req, res) {
    try {
      const data = await payrollService.getMyPayrollById(
        req.user.id,
        req.params.id
      );
      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new PayrollController();