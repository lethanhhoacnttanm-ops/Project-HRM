import mongoose from 'mongoose';

const ShiftSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, 
    code: { type: String, required: true, unique: true, uppercase: true }, 
    checkInTime: { type: String, required: true }, 
    checkOutTime: { type: String, required: true }, 
    breakTime: { type: String, default: '' }, 
    status: {
      type: String,
      enum: ['Đang áp dụng', 'Xoay ca', 'Tạm dừng'],
      default: 'Đang áp dụng',
    },
  },
  { timestamps: true }
);

const ShiftModel = mongoose.model('shifts', ShiftSchema);
export default ShiftModel;