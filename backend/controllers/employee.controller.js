import employeeService from '../services/employee.service.js';

class EmployeesController {
  async getAllEmployees(req, res) {
    try {
      const employees = await employeeService.getAllEmployee();
      return res.status(200).json({
        success: true,
        message: 'Lấy danh sách nhân viên thành công!',
        data: employees,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Lỗi máy chủ khi lấy danh sách nhân viên!',
        error: error.message,
      });
    }
  }

  // ===== EMP-Profile =====
  async getMyProfile(req, res) {
    try {
      const employee = await employeeService.getMyProfile(req.user.id);
      return res.status(200).json({
        success: true,
        data: employee,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async updateMyProfile(req, res) {
    try {
      const updated = await employeeService.updateMyProfile(
        req.user.id,
        req.body
      );
      return res.status(200).json({
        success: true,
        message: 'Cập nhật hồ sơ thành công!',
        data: updated,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async changePassword(req, res) {
    try {
      await employeeService.changePassword(req.user.id, req.body);
      return res.status(200).json({
        success: true,
        message: 'Đổi mật khẩu thành công!',
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new EmployeesController();