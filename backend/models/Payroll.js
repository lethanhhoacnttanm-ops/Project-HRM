import mongoose from 'mongoose';

const PayrollSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'employees',
      required: true,
    },
    contract: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'contracts',
      required: true,
    },
    monthYear: { type: String, required: true },
    baseSalary: { type: Number, required: true, default: 0 },
    allowance: { type: Number, default: 0 },
    bonus: { type: Number, default: 0 },
    deductions: { type: Number, default: 0 },
    netSalary: { type: Number, required: true, default: 0 },
    bonusType: { type: String, default: '' },
    isLocked: { type: Boolean, default: false },
    lockedAt: { type: Date, default: null },
    lockedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'employees', default: null },
    status: {
      type: String,
      enum: ['Đang xử lý', 'Đã chốt'],
      default: 'Đang xử lý'
    },
    feedback: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

const PayrollModel = mongoose.model('payrolls', PayrollSchema);
export default PayrollModel;