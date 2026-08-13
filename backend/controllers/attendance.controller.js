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
}

export default new AttendanceController();