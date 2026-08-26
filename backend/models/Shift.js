import mongoose from 'mongoose';

const ShiftSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, 
    code: { type: String, required: true, unique: true, uppercase: true }, 
    checkInTime: { type: String, required: true }, 
    checkOutTime: { type: String, required: true }, 
    breakTime: { type: String, default: '0 phút' },
    appliedEmployeesCount: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['Đang áp dụng', 'Xoay ca', 'Đã hủy'],
      default: 'Đang áp dụng',
    },
  },
  { timestamps: true }
);

const ShiftModel = mongoose.model('shifts', ShiftSchema);
export default ShiftModel;