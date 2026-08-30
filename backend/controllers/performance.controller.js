import performanceService from '../services/performance.service.js';

class PerformanceController {
  async createCycle(req, res) {
    try {
      const { quarter } = req.body;
      const adminId = req.user?._id;

      if (!quarter) {
        return res.status(400).json({ success: false, message: "Vui lòng chọn chu kỳ đánh giá!" });
      }

      const result = await performanceService.createCycleForEmployees(quarter, adminId);

      return res.status(201).json({
        success: true,
        message: `Đã khởi tạo thành công chu kỳ ${quarter} cho toàn bộ nhân sự!`,
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message || "Lỗi khi tạo chu kỳ đánh giá",
      });
    }
  }

  async getMyReview(req, res) {
    try {
      const employeeId = req.user?._id;
      const { quarter } = req.query;

      if (!quarter) {
        return res.status(400).json({ success: false, message: "Thiếu thông tin chu kỳ (quarter)!" });
      }

      const review = await performanceService.getMyReview(employeeId, quarter);
      return res.status(200).json({ success: true, data: review });
    } catch (error) {
      return res.status(404).json({ success: false, message: error.message });
    }
  }

  async submitSelfAssessment(req, res) {
    try {
      const employeeId = req.user?._id;
      const { quarter, outsourcingScore, trainingScore, feedback } = req.body;

      if (!quarter) {
        return res.status(400).json({ success: false, message: "Thiếu thông tin chu kỳ!" });
      }

      const result = await performanceService.submitSelfAssessment(employeeId, quarter, {
        outsourcingScore,
        trainingScore,
        feedback,
      });

      return res.status(200).json({
        success: true,
        message: "Đã nộp form tự đánh giá thành công!",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }
  
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

  async getTeamPerformance(req, res) {
    try {
      const teamData = await performanceService.getTeamPerformanceSummary();

      return res.status(200).json({
        success: true,
        data: teamData,
      });
    } catch (error) {
      console.error("❌ Lỗi lấy hiệu suất nhóm:", error);
      return res.status(500).json({
        success: false,
        message: error.message || 'Lỗi server khi lấy dữ liệu hiệu suất nhóm!',
      });
    }
  };

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

  async getAllPerformance(req, res) {
    try {
      const { page, limit } = req.query;
      const result = await performanceService.getAllPerformance({ page, limit });
      return res.status(200).json({
        success: true,
        message: 'Lấy danh sách đánh giá hiệu xuất thành công!',
        dataPerformance: result.dataPerformance || result,
        pagination: result.pagination || {}
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Lỗi máy chủ khi lấy danh sách đánh giá hiệu xuất!',
        error: error.message,
      });
    }
  };


  async createPerformance(req, res) {
    try {
      const evaluatorId = req.user._id || req.user.id;

      const newPerformance = await performanceService.createPerformance(req.body, evaluatorId);

      return res.status(201).json({
        success: true,
        message: 'Tạo chu kỳ đánh giá hiệu suất thành công!',
        data: newPerformance,
      });
    } catch (error) {
      console.error("❌ LỖI THỰC TẾ TẠI SERVER:", error);
      return res.status(500).json({
        success: false,
        message: error.message || 'Lỗi server khi tạo đánh giá!',
      });
    }
  };
}

export default new PerformanceController();