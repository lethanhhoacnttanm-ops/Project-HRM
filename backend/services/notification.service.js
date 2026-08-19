import notificationRepository from '../repositories/notification.repository.js';

class NotificationService {
  async getMyNotifications(query = {}) {
    return await notificationRepository.findPublished({
      type: query.type,
    });
  }
}

export default new NotificationService();