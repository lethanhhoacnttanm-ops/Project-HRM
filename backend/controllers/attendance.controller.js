import attendanceService from '../services/attendance.service.js';

class AttendanceController {
  async getMyAttendance(req, res) {
    try {
      const data = await attendanceService.getMyAttendance(
        req.user.id,
        req.query
      );
      return res.status(200).json({
        success: true,
        message: 'Lấy dữ liệu chấm công thành công!',
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Lỗi khi lấy chấm công!',
      });
    }
  }

  async getAllAttendance(req, res) {
    try {
      const { page, limit } = req.query;
      const result = await attendanceService.getAllAttendance({ page, limit });
      return res.status(200).json({
        success: true,
        message: 'Lấy danh sách chấm công thành công!',
        dataAttendance: result.dataAttendance || result,
        pagination: result.pagination || {}
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Lỗi máy chủ khi lấy danh sách chấm công!',
        error: error.message,
      });
    }
  };

  async getStatus(req, res) {
    try {
      const employeeId = req.user?.id || req.employee?._id;
      const result = await attendanceService.getEmployeeTodayStatus(employeeId);
      return res.status(200).json({ success: true, data: result });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  async checkIn(req, res) {
    try {
      const employeeId = req.user?.id || req.employee?._id;

      if (!employeeId) {
        return res.status(401).json({ success: false, message: "Không tìm thấy thông tin xác thực nhân viên!" });
      }

      const result = await attendanceService.checkInEmployee(employeeId, req.body);

      return res.status(201).json({
        success: true,
        message: "Chấm công thành công!",
        data: result,
      });
    } catch (error) {
      console.error("Lỗi Controller Check-in:", error);
      return res.status(400).json({
        success: false,
        message: error.message || "Lỗi server nội bộ khi chấm công!",
      });
    }
  }

  async checkOut(req, res) {
    try {
      const employeeId = req.user?.id || req.employee?._id;
      if (!employeeId) {
        return res.status(401).json({ success: false, message: "Không tìm thấy thông tin xác thực nhân viên!" });
      }

      const result = await attendanceService.checkOutEmployee(employeeId, req.body);

      return res.status(200).json({
        success: true,
        message: "Check-out thành công!",
        data: result,
      });
    } catch (error) {
      console.error("Lỗi Controller Check-out:", error);
      return res.status(400).json({
        success: false,
        message: error.message || "Lỗi server nội bộ khi Check-out!",
      });
    }
  }
}

export default new AttendanceController();