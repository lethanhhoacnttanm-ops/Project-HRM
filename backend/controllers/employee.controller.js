import employeeService from '../services/employee.service.js';

class EmployeesController {
  async getAllEmployees(req, res) {
    try {
      const { page, limit, role, status } = req.query;
      const result = await employeeService.getAllEmployee({ page, limit, role, status });
      return res.status(200).json({
        success: true,
        message: 'Lấy danh sách nhân viên thành công!',
        dataEmp: result.dataEmp || result, 
        pagination: result.pagination || {}
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Lỗi máy chủ khi lấy danh sách nhân viên!',
        error: error.message,
      });
    }
  };

  async updateEmployee(req, res) {
    try {
      const { id } = req.params; 
      const payload = req.body;  

      const updatedEmployee = await employeeService.updateEmployeeInfo(id, payload);

      return res.status(200).json({
        success: true,
        message: 'Cập nhật thông tin nhân viên thành công!',
        data: updatedEmployee
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Lỗi khi cập nhật nhân viên!',
        error: error.message
      });
    }
  }

   async assignEmployeeToDepartment (req, res) {
    try {
      const { employeeId, departmentId, positionId, level } = req.body;

      const updatedEmployee = await employeeService.updateEmployeePosition(
        employeeId,
        {
          department: departmentId,
          position: positionId,
          level: level
        }
      )

      return res.status(200).json({
        success: true,
        message: "Gán nhân sự vào phòng ban thành công!",
        data: updatedEmployee
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  };

  async register(req, res) {
      try {
        const { employee } = await employeeService.registerEmployee(req.body);
       
        return res.status(201).json({
          success: true,
          message: 'Đăng ký tài khoản nhân viên thành công! Chờ quản trị viên duyệt',
          data: {
            id: employee._id,
            employeeCode: employee.code,
            fullName: employee.fullName,
            email: employee.email,
            role: employee.role,
          },
        });
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: error.message,
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