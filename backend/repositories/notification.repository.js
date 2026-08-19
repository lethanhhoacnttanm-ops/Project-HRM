import NotificationModel from '../models/Notification.js';

class NotificationRepository {
  async findPublished({ type } = {}) {
    const filter = { status: 'Đã gửi' };
    if (type) filter.type = type;

    return await NotificationModel.find(filter)
      .sort({ sendDate: -1, createdAt: -1 })
      .lean();
  }
}

export default new NotificationRepository();