import supportService from '../services/support.service.js';

class SupportController {
  async getMyTickets(req, res) {
    try {
      const data = await supportService.getMyTickets(req.user.id);
      return res.status(200).json({
        success: true,
        message: 'Lấy danh sách yêu cầu hỗ trợ thành công!',
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Lỗi khi lấy yêu cầu hỗ trợ!',
      });
    }
  }

  async createTicket(req, res) {
    try {
      const data = await supportService.createTicket(req.user.id, req.body);
      return res.status(201).json({
        success: true,
        message: 'Gửi yêu cầu hỗ trợ thành công!',
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

export default new SupportController();