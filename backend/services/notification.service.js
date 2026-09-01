import notificationRepository from '../repositories/notification.repository.js';

class NotificationService {
  async markAsRead(notificationId, employeeId) {
    const updated = await notificationRepository.markAsRead(notificationId, employeeId);
    if (!updated) throw new Error('Không tìm thấy thông báo!');
    return updated;
  }

  async getMyNotifications(query = {}) {
    return await notificationRepository.findPublished({
      type: query.type,
    });
  }

  async getAllNotifications() {
    const notifications = await notificationRepository.findAll();
    return notifications.map((item) => ({
      ...item,
      readCount: item.readBy ? item.readBy.length : 0,
    }));
  }

  async createNotification(data) {
    const newNotification = await notificationRepository.create(data);
    return newNotification;
  }

  async updateNotification(id, data) {
    const updated = await notificationRepository.update(id, data);
    if (!updated) throw new Error('Không tìm thấy thông báo cần cập nhật!');
    return updated;
  }

  async deleteNotification(id) {
    const deleted = await notificationRepository.delete(id);
    if (!deleted) throw new Error('Không tìm thấy thông báo cần xóa!');
    return deleted;
  }
}

export default new NotificationService();