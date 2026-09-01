import mongoose from 'mongoose';

const AuditLogSchema = new mongoose.Schema(
  {
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'employees', default: null },
    userName: { type: String, required: true, default: 'Ẩn danh' },
    
    action: { type: String, required: true },
    status: {
      type: String,
      enum: ['Thành công', 'Thất bại'],
      default: 'Thành công',
    },

    device: { type: String, default: 'Unknown Device' },

    ipAddress: { type: String, default: '127.0.0.1' },
    location: { type: String, default: 'Unknown Location' }, 

    createdAt: { 
      type: Date, 
      default: Date.now, 
      expires: 86400 
    }
  },
  { 
    timestamps: false 
  }
);

AuditLogSchema.index({ createdAt: -1 });

const AuditLogModel = mongoose.model('audit_logs', AuditLogSchema);
export default AuditLogModel;