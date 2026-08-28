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

  async getAllLeave(req, res) {
    try {
      const { page, limit } = req.query;
      const result = await leaveService.getAllLeave({ page, limit });
      return res.status(200).json({
        success: true,
        message: 'Lấy danh sách đơn nghỉ việc thành công!',
        dataLeave: result.dataLeave || result,
        pagination: result.pagination || {}
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Lỗi máy chủ khi lấy danh sách đơn nghỉ việc!',
        error: error.message,
      });
    }
  };

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

  async updateStatus(req, res) {
    try {
      const { id } = req.params; 
      const { status } = req.body; 
      
      const currentAdminId = req.user?._id || req.user?.id; 

      if (!['Đã duyệt', 'Từ chối'].includes(status)) {
        return res.status(400).json({ success: false, message: 'Trạng thái không hợp lệ!' });
      }

      const updatedLeave = await leaveService.updateLeaveStatus(id, status, currentAdminId);

      if (!updatedLeave) {
        return res.status(404).json({ success: false, message: 'Không tìm thấy đơn nghỉ phép!' });
      }

      return res.status(200).json({
        success: true,
        message: 'Cập nhật trạng thái đơn thành công!',
        data: updatedLeave,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default new LeaveController();
