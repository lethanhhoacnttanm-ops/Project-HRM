import NotificationModel from '../models/Notification.js';

class NotificationRepository {
  async markAsRead(notificationId, employeeId) {
    try {
      return await NotificationModel.findByIdAndUpdate(
        notificationId,
        {
          $addToSet: {
            readBy: { employeeId, readAt: new Date() }
          }
        },
        { new: true }
      ).lean();
    } catch (error) {
      throw new Error(`Lỗi Repository (Mark As Read): ${error.message}`);
    }
  }
  async findPublished({ type } = {}) {
    const filter = { status: 'Đã gửi' };
    if (type) filter.type = type;

    return await NotificationModel.find(filter)
      .sort({ sendDate: -1, createdAt: -1 })
      .lean();
  }

  async findAll() {
    try {
      return await NotificationModel.find()
        .sort({ createdAt: -1 })
        .lean();
    } catch (error) {
      throw new Error(`Lỗi Repository (Find All Notifications): ${error.message}`);
    }
  }

  async create(data) {
    try {
      return await NotificationModel.create(data);
    } catch (error) {
      throw new Error(`Lỗi Repository (Create Notification): ${error.message}`);
    }
  }

  async update(id, data) {
    try {
      return await NotificationModel.findByIdAndUpdate(id, data, { new: true }).lean();
    } catch (error) {
      throw new Error(`Lỗi Repository (Update Notification): ${error.message}`);
    }
  }

  async delete(id) {
    try {
      return await NotificationModel.findByIdAndDelete(id).lean();
    } catch (error) {
      throw new Error(`Lỗi Repository (Delete Notification): ${error.message}`);
    }
  }
}

export default new NotificationRepository();