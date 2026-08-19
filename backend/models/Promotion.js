import mongoose, { trusted } from 'mongoose';

const PromotionSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'employees',
      required: true,
    },
    avatarUrl: { type: String, default: '' },
    nameEmployee: { type: String, required: true, trim: true },
    emailEmployee: { type: String, required: true, unique: true, lowercase: true, trim: true },
    currentDepartment: { type: String, required: true },
    currentPosition: { type: String, required: true },
    currentLevel: { type: String, required: true },
    proposedLevel: { type: String, required: true },
    performanceRating: {
      type: Number,
      min: 0,
      max: 5,
      required: true
    },
    status: {
      type: String,
      enum: ['PENDING_REVIEW', 'APPROVED_PENDING_EFFECTIVE', 'WAITING', 'COMPLETED', 'REJECTED'],
      default: 'PENDING_REVIEW',
    },
    promotionType: {
      type: String,
      enum: ['Vertical', 'Lateral', 'Merit-based'],
      default: 'Vertical',
    },
    gradetenure: {
      type: Number,
      required: true
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'employees',
      default: null
    },
    effectiveDate: { type: Date, default: null },
  },
  { timestamps: true }
);

const PromotionModel = mongoose.model('promotions', PromotionSchema);
export default PromotionModel;