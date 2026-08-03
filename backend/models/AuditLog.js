import mongoose from 'mongoose';

const AuditLogSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true, default: 'Ẩn danh' },
    action: { type: String, required: true }, 
    status: {
      type: String,
      enum: ['Thành công', 'Thất bại'],
      default: 'Thành công',
    },
    ipAddress: { type: String, default: '127.0.0.1' },
  },
  { timestamps: true }
);

const AuditLogModel = mongoose.model('audit_logs', AuditLogSchema);
export default AuditLogModel;