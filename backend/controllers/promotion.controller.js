import promotionService from "../services/promotion.service.js";

class PromotionsController {
    async createPromotion(req, res) {
        try {
            const adminId = req.user._id;

            const newPromotion = await promotionService.createPromotion(req.body, adminId);

            return res.status(201).json({
                success: true,
                message: 'Tạo đề xuất thăng tiến thành công và đang chờ đến ngày hiệu lực!',
                data: newPromotion,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message || 'Lỗi hệ thống khi tạo đề xuất!',
            });
        }
    };

    async getAllPromotion(req, res) {
        try {
            const { page, limit, status } = req.query;
            const result = await promotionService.getAllPromotion({ page, limit, status });
            return res.status(200).json({
                success: true,
                message: 'Lấy danh sách những đề xuất thăng tiến thành công!',
                dataPromotions: result.dataPromotion || result,
                pagination: result.pagination || {}
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Lỗi máy chủ khi lấy danh sách  những đề xuất thăng tiến!',
                error: error.message,
            });
        }
    };

    async updateStatus(req, res) {
    try {
      const { id } = req.params; 
      const payload = req.body; 

      const result = await promotionService.updatePromotionStatus(id, payload);

      return res.status(200).json({
        success: true,
        message: "Đã di chuyển qua kiểm tra",
        data: result
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Lỗi máy chủ khi cập nhật trạng thái đề xuất!",
      });
    }
  }
}

export default new PromotionsController();
