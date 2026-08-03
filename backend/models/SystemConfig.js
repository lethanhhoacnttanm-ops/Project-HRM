import mongoose from 'mongoose';

const SystemConfigSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      default: 'Công ty Cổ phần Giải pháp Công nghệ Việt',
    },
    taxCode: { type: String, default: '0123456789' },
    address: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    logoUrl: { type: String, default: '' },
    language: { type: String, default: 'vi' },
    timezone: { type: String, default: 'gmt7' },
    dateFormat: { type: String, default: 'ddmmyyyy' },
    timeFormat: { type: String, default: '24h' },
    mfaEnabled: { type: Boolean, default: true },
    essEnabled: { type: Boolean, default: true },
    syncHolidays: { type: Boolean, default: false },
    emailNotification: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const SystemConfigModel = mongoose.model('configs', SystemConfigSchema);
export default SystemConfigModel;