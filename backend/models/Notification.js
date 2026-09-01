import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    subTitle: { type: String, default: '' },
    
    content: { type: String, required: true }, 

    type: {
      type: String,
      enum: ['Tin tức chung', 'Sự kiện', 'Chính sách', 'Hệ thống', 'Lương', 'Hiệu suất', 'Nghỉ phép', 'Khẩn cấp'],
      required: true,
    },

    recipientGroup: { type: String, default: 'Toàn công ty' },

    attachments: [{ type: String }], 

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'employees', required: true },

    sendDate: { type: Date, default: Date.now },

    status: {
      type: String,
      enum: ['Đã gửi', 'Đang chờ', 'Nháp'],
      default: 'Nháp',
    },

    readBy: [
      {
        employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'employees' },
        readAt: { type: Date, default: Date.now }
      }
    ],
  },
  { timestamps: true }
);

const NotificationModel = mongoose.model('notifications', NotificationSchema);
export default NotificationModel;