import mongoose from 'mongoose';

const AttendanceSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'employees',
      required: true,
    },
    shift: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'shifts',
      default: null,
    },
    date: { type: Date, required: true },
    checkIn: { type: String, default: '--:--' },
    checkOut: { type: String, default: '--:--' },
    totalHours: { type: String, default: '0h 00m' },
    status: {
      type: String,
      enum: ['Đúng giờ', 'Đi muộn', 'Vắng mặt', 'Về sớm'],
      default: 'Đúng giờ',
    },
    isCheckInLate: { type: Boolean, default: false },
    editRequest: {
      requestedCheckIn: { type: String },
      requestedCheckOut: { type: String },
      reason: { type: String },
      requestStatus: {
        type: String,
        enum: ['None', 'Pending', 'Approved', 'Rejected'],
        default: 'None',
      },
    },
  },
  { timestamps: true }
);

const AttendanceModel = mongoose.model('attendances', AttendanceSchema);
export default AttendanceModel;