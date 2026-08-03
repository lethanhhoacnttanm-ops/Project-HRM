import mongoose from 'mongoose';

const PromotionSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'employees',
      required: true,
    },
    currentRole: { type: String, required: true },
    proposedRole: { type: String, required: true },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'departments',
      required: true,
    },
    score: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['Approved', 'Review', 'Pending'],
      default: 'Pending',
    },
    type: {
      type: String,
      enum: ['Vertical', 'Lateral', 'Merit-based'],
      default: 'Vertical',
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'employees',
      default: null,
    },
    effectiveDate: { type: Date },
  },
  { timestamps: true }
);

const PromotionModel = mongoose.model('promotions', PromotionSchema);
export default PromotionModel;