import SystemConfigModel from '../models/SystemConfig.js';

export const systemConfigController = {
  getConfig: async (req, res) => {
    try {
      let config = await SystemConfigModel.findOne();
      
      if (!config) {
        config = await SystemConfigModel.create({
          companyName: 'Công ty Cổ phần Giải pháp Công nghệ Việt',
          taxCode: '0123456789',
          address: 'Tầng 12, Tòa nhà Innovation, Khu Công nghệ cao, Quận 9, TP. HCM',
          email: 'contact@vn-techsolutions.vn',
          phone: '+84 28 1234 5678',
        });
      }

      return res.status(200).json({ success: true, data: config });
    } catch (error) {
      console.error('Lỗi lấy cấu hình:', error);
      return res.status(500).json({ success: false, message: 'Lỗi server khi lấy cấu hình' });
    }
  },

  saveConfig: async (req, res) => {
    try {
      const updateData = req.body;
      
      const updatedConfig = await SystemConfigModel.findOneAndUpdate(
        {}, 
        updateData, 
        { returnDocument: 'after', upsert: true, runValidators: true }
      );

      return res.status(200).json({
        success: true,
        message: 'Lưu cấu hình hệ thống thành công!',
        data: updatedConfig
      });
    } catch (error) {
      console.error('Lỗi lưu cấu hình:', error);
      return res.status(400).json({ success: false, message: error.message || 'Lưu cấu hình thất bại' });
    }
  }
};