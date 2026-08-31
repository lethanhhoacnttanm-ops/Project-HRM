import benefitService from '../services/benefit.service.js';

class BenefitController {

  async getMyBenefitsNew(req, res) {
  try {
    const employeeId = req.user?.id || req.user?._id; 

    console.log("ID nhân viên đang xem phúc lợi:", employeeId);

    const benefits = await benefitService.getBenefitsForEmployee(employeeId);

    return res.status(200).json({ success: true, data: benefits });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

  async createBenefit(req, res) {
    try {
      const benefitData = req.body;

      const newBenefit = await benefitService.createBenefit(benefitData);

      return res.status(201).json({
        success: true,
        message: 'Tạo chính sách phúc lợi thành công!',
        data: newBenefit,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Lỗi máy chủ khi tạo phúc lợi!',
      });
    }
  }

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

  async getBenefits(req, res) {
    try {
      const benefits = await benefitService.getBenefits();

      return res.status(200).json({
        success: true,
        data: benefits,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Lỗi máy chủ khi lấy danh sách phúc lợi!',
      });
    }
  }

  async updateBenefit(req, res) {
    try {
      const { id } = req.params;
      const updated = await benefitService.updateBenefit(id, req.body);
      return res.status(200).json({ success: true, message: 'Cập nhật thành công!', data: updated });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  async assignEmployees(req, res) {
    try {
      const { id } = req.params;
      const employeeIds = Array.isArray(req.body) ? req.body : req.body?.employeeIds;

      console.log("ID phúc lợi:", id);
      console.log("Mảng nhân viên nhận được ở BE:", employeeIds);

      const result = await benefitService.assignEmployees(id, employeeIds);
      return res.status(200).json({ success: true, message: 'Phân bổ nhân viên thành công!', data: result });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  async deleteBenefit(req, res) {
    try {
      const { id } = req.params;
      await benefitService.deleteBenefit(id);
      return res.status(200).json({ success: true, message: 'Xóa chính sách thành công!' });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default new BenefitController();