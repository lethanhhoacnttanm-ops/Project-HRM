import leaveService from '../services/leave.service.js';

class LeaveController {
  async getMyLeaves(req, res) {
    try {
      const data = await leaveService.getMyLeaves(req.user.id);
      return res.status(200).json({
        success: true,
        message: 'Lấy danh sách đơn nghỉ phép thành công!',
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Lỗi khi lấy đơn nghỉ phép!',
      });
    }
  }

  async createMyLeave(req, res) {
    try {
      const data = await leaveService.createLeave(req.user.id, req.body);
      return res.status(201).json({
        success: true,
        message: 'Nộp đơn nghỉ phép thành công!',
        data,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new LeaveController();
