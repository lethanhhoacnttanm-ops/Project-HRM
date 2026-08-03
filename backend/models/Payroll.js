import mongoose from 'mongoose';

const PayrollSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'employees',
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
  },
  { timestamps: true }
);

const PayrollModel = mongoose.model('payrolls', PayrollSchema);
export default PayrollModel;