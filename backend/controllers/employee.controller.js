import employeeService from "../services/employee.service.js";

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
  };
}

export default new EmployeesController();