import payrollService from '../services/payroll.service.js';

class PayrollController {

  async toggleLock(req, res) {
    try {
      const { id } = req.params;
      const { isLocked } = req.body;

      const updatedPayroll = await payrollService.toggleLock(id, isLocked);

      return res.status(200).json({
        success: true,
        message: isLocked ? "Đã khóa phiếu lương thành công!" : "Đã mở khóa phiếu lương!",
        data: updatedPayroll,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message || "Lỗi khi thay đổi trạng thái khóa phiếu lương",
      });
    }
  }

  async lockMonth(req, res) {
    try {
      const { monthYear } = req.body;
      const adminId = req.user?._id; 

      if (!monthYear) {
        return res.status(400).json({ success: false, message: "Thiếu thông tin kỳ lương (monthYear)!" });
      }

      const result = await payrollService.lockMonthPayrolls(monthYear, adminId);

      return res.status(200).json({
        success: true,
        message: `Đã khóa thành công bảng lương Tháng ${monthYear}!`,
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message || "Lỗi khi khóa bảng lương kỳ này",
      });
    }
  }

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

  async getPayrolls(req, res) {
    try {
      const { monthYear } = req.query;
      if (!monthYear) {
        return res.status(400).json({ success: false, message: "Thiếu thông tin kỳ lương (monthYear)!" });
      }

      const result = await payrollService.getOrInitPayrollsByMonth(monthYear);
      return res.status(200).json({ success: true, data: result });
    } catch (error) {
      console.error("Lỗi lấy bảng lương:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  async createPayroll(req, res) {
    try {
      const newPayroll = await payrollService.createPayroll(req.body);
      return res.status(201).json({ success: true, message: "Tạo phiếu lương thành công!", data: newPayroll });
    } catch (error) {
      console.error("Lỗi tạo phiếu lương:", error);
      return res.status(400).json({ success: false, message: error.message });
    }
  }

  async updatePayroll(req, res) {
    try {
      const { id } = req.params;
      const updatedPayroll = await payrollService.updatePayroll(id, req.body);
      return res.status(200).json({ success: true, message: "Cập nhật phiếu lương thành công!", data: updatedPayroll });
    } catch (error) {
      console.error("Lỗi cập nhật phiếu lương:", error);
      return res.status(400).json({ success: false, message: error.message });
    }
  }
}

export default new PayrollController();