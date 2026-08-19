import notificationService from '../services/notification.service.js';

class NotificationController {
  async getMyNotifications(req, res) {
    try {
      const data = await notificationService.getMyNotifications(req.query);
      return res.status(200).json({
        success: true,
        message: 'Lấy danh sách thông báo thành công!',
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Lỗi khi lấy thông báo!',
      });
    }
  }
}

export default new NotificationController();