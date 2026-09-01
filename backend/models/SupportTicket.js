import mongoose from 'mongoose';

const SupportTicketSchema = new mongoose.Schema(
  {
    ticketCode: { type: String, required: true, unique: true }, 
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'employees',
      required: true,
    },
    title: { type: String, required: true }, 
    description: { type: String, required: true }, 
    category: {
      type: String,
      enum: ['Công nghệ thông tin', 'Hành chính & Nhân sự', 'Lương & Phúc lợi'],
      default: 'Công nghệ thông tin',
    },
    priority: {
      type: String,
      enum: ['Cao', 'Trung bình', 'Thấp'],
      default: 'Trung bình',
    },
    status: {
      type: String,
      enum: ['Mở', 'Đang xử lý', 'Đã giải quyết', 'Đóng'],
      default: 'Mở',
    },
    adminResponse: { type: String, default: '' },
    resolvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'employees',
      default: null,
    },
  },
  { timestamps: true }
);

const SupportTicketModel = mongoose.model('tickets', SupportTicketSchema);
export default SupportTicketModel;