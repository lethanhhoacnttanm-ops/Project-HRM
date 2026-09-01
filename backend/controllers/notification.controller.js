import notificationService from '../services/notification.service.js';

class NotificationController {
  async markAsRead(req, res) {
    try {
      const { id } = req.params;
      const employeeId = req.user?.id || req.user?._id;

      if (!employeeId) {
        return res.status(401).json({ success: false, message: 'Chưa xác thực người dùng!' });
      }

      const result = await notificationService.markAsRead(id, employeeId);

      return res.status(200).json({ success: true, message: 'Đã cập nhật trạng thái đã đọc', data: result });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

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

  async getAll(req, res) {
    try {
      const data = await notificationService.getAllNotifications();
      return res.status(200).json({ success: true, data });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  async create(req, res) {
    try {
      const payload = {
        ...req.body,
        createdBy: req.user?.id || req.user?._id || null,
      };

      const result = await notificationService.createNotification(payload);
      return res.status(201).json({ success: true, message: 'Tạo thông báo thành công!', data: result });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const result = await notificationService.updateNotification(id, req.body);
      return res.status(200).json({ success: true, message: 'Cập nhật thông báo thành công!', data: result });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  async remove(req, res) {
    try {
      const { id } = req.params;
      await notificationService.deleteNotification(id);
      return res.status(200).json({ success: true, message: 'Xóa thông báo thành công!' });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default new NotificationController();