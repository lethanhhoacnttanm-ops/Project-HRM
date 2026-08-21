import benefitService from '../services/benefit.service.js';

class BenefitController {
  async getMyBenefits(req, res) {
    try {
      const data = await benefitService.getOpenBenefits(req.query);
      return res.status(200).json({
        success: true,
        message: 'Lấy danh sách phúc lợi thành công!',
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Lỗi khi lấy phúc lợi!',
      });
    }
  }

  async getBenefitDetail(req, res) {
    try {
      const data = await benefitService.getBenefitDetail(req.params.id);
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

export default new BenefitController();