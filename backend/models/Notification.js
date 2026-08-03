import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subTitle: { type: String, default: '' },
    type: {
      type: String,
      enum: ['Hệ thống', 'Lương', 'Hiệu suất', 'Nghỉ phép'],
      required: true,
    },
    recipientGroup: { type: String, default: 'Toàn công ty' },
    sendDate: { type: Date },
    status: {
      type: String,
      enum: ['Đã gửi', 'Đang chờ', 'Nháp'],
      default: 'Nháp',
    },
  },
  { timestamps: true }
);

const NotificationModel = mongoose.model('notifications', NotificationSchema);
export default NotificationModel;