import reportService from '../services/report.service.js';

class ReportController {
  async getMyReport(req, res) {
    try {
      const data = await reportService.getMyReport(req.user.id, req.query);
      return res.status(200).json({
        success: true,
        message: 'Lấy báo cáo cá nhân thành công!',
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Lỗi khi lấy báo cáo cá nhân!',
      });
    }
  }
}

export default new ReportController();