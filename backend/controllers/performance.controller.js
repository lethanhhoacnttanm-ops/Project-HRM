import performanceService from '../services/performance.service.js';

class PerformanceController {
  async getMyEvaluations(req, res) {
    try {
      const data = await performanceService.getMyEvaluations(req.user.id);
      return res.status(200).json({
        success: true,
        message: 'Lấy danh sách đánh giá thành công!',
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Lỗi khi lấy đánh giá!',
      });
    }
  }

  async getMyEvaluationDetail(req, res) {
    try {
      const data = await performanceService.getMyEvaluationDetail(
        req.user.id,
        req.params.id
      );
      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new PerformanceController();