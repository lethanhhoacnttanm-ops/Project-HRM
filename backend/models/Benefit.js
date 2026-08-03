import mongoose from 'mongoose';

const BenefitSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, 
    type: {
      type: String,
      enum: ['Bảo hiểm', 'Phụ cấp', 'Đãi ngộ'],
      required: true,
    },
    budget: { type: String, required: true }, 
    participantsCount: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['Đang mở', 'Tạm dừng'],
      default: 'Đang mở',
    },
  },
  { timestamps: true }
);

const BenefitModel = mongoose.model('benefits', BenefitSchema);
export default BenefitModel;