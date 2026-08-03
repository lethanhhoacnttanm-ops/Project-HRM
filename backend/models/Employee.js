import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, default: '' },
    avatarUrl: { type: String, default: '' },
    gender: { type: String, enum: ['Nam', 'Nữ', 'Khác'], default: 'Nam' },
    dateOfBirth: { type: Date },
    identityCard: { type: String, unique: true, sparse: true },
    position: { type: String, default: 'Nhân viên' },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'departments',
      default: null,
    },
    status: {
      type: String,
      enum: ['active', 'leave', 'resigned'],
      default: 'active',
    },
    startDate: { type: Date, default: Date.now },
    role: {
      type: String,
      enum: ['ADMIN', 'MANAGER', 'EMPLOYEE'],
      default: 'EMPLOYEE',
    },
    password: { type: String, required: true, select: false },
  },
  { timestamps: true }
);

const EmployeeModel = mongoose.model('employees', EmployeeSchema);
export default EmployeeModel;