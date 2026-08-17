import mongoose from 'mongoose';
import { PASSWORD_ERROR_MESSAGE, PASSWORD_REGEX } from '../../frontend/src/utils/validators.js'

const EmployeeSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, default: '' },
    avatarUrl: { type: String, default: '' },
    gender: { type: String, enum: ['Nam', 'Nữ', 'Khác'] },
    dateOfBirth: { type: Date },
    identityCard: { type: String, unique: true, sparse: true },
    position: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'positions',
      default: null,
    },
    level: {
      type: String,
      default: 'Intern'
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'departments',
      default: null,
    },
    status: {
      type: String,
      enum: ['active', 'leave', 'resigned', 'pending'],
      default: 'pending',
    },
    startDate: { type: Date, default: Date.now },
    role: {
      type: String,
      enum: ['ADMIN', 'MANAGER', 'EMPLOYEE', 'NONE'],
      default: 'NONE',
    },
    password: {
      type: String,
      required: true,
      select: false,
      validate: {
        validator: function (value) {
          return PASSWORD_REGEX.test(value);
        },
        message: PASSWORD_ERROR_MESSAGE,
      },
    },
  },
  { timestamps: true }
);

const EmployeeModel = mongoose.model('employees', EmployeeSchema);
export default EmployeeModel;