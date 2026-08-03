import mongoose from 'mongoose';

const LeaveSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'employees',
      required: true,
    },
    leaveType: {
      type: String,
      enum: ['Nghỉ phép năm', 'Nghỉ ốm', 'Nghỉ việc riêng'],
      required: true,
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    numberOfDays: { type: Number, required: true },
    reason: { type: String, default: '' },
    status: {
      type: String,
      enum: ['Chờ duyệt', 'Đã duyệt', 'Từ chối'],
      default: 'Chờ duyệt',
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'employees',
      default: null,
    },
  },
  { timestamps: true }
);

const LeaveModel = mongoose.model('leaves', LeaveSchema);
export default LeaveModel;