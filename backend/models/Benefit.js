import mongoose from 'mongoose';

const BenefitSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, 
    description: { type: String }, 
    type: {
      type: String,
      enum: ['Bảo hiểm', 'Phụ cấp', 'Đãi ngộ'],
      required: true,
    },
    amount: { type: Number, required: true }, 
    frequency: {
      type: String,
      enum: ['Hàng tháng', 'Hàng quý', 'Hàng năm', 'Một lần'],
      default: 'Hàng tháng',
    }, 
    assignedEmployees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employees',
      }
    ],

    status: {
      type: String,
      enum: ['Đang mở', 'Tạm dừng'],
      default: 'Đang mở',
    },
  },
  { timestamps: true }
);

BenefitSchema.virtual('participantsCount').get(function () {
  return this.assignedEmployees ? this.assignedEmployees.length : 0;
});

BenefitSchema.set('toObject', { virtuals: true });
BenefitSchema.toJSON = { virtuals: true };

const BenefitModel = mongoose.model('benefits', BenefitSchema);
export default BenefitModel;