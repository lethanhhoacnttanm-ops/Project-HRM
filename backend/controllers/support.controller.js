import supportService from '../services/support.service.js';

class SupportController {
  createTicket = async (req, res) => {
    try {
      const employeeId = req.user?.id || req.user?._id;
      const result = await supportService.createTicket(employeeId, req.body);
      return res.status(201).json({ success: true, message: 'Gửi yêu cầu hỗ trợ thành công', data: result });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  };

  getMyTickets = async (req, res) => {
    try {
      const employeeId = req.user?.id || req.user?._id;
      const result = await supportService.getMyTickets(employeeId);
      return res.status(200).json({ success: true, data: result });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  };

  getAllTickets = async (req, res) => {
    try {
      const result = await supportService.getAllTicketsForAdmin();
      return res.status(200).json({ success: true, data: result });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  };

  updateTicket = async (req, res) => {
    try {
      const { id } = req.params;
      const adminId = req.user?.id || req.user?._id;
      const result = await supportService.updateTicketByAdmin(id, adminId, req.body);
      return res.status(200).json({ success: true, message: 'Cập nhật phiếu hỗ trợ thành công', data: result });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  };
}

export default new SupportController();