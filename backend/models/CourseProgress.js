import mongoose from 'mongoose';

const CourseProgressSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'employees',
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'courses',
      required: true,
    },
    progress: { type: Number, default: 0, min: 0, max: 100 },
    status: {
      type: String,
      enum: ['Completed', 'In Progress', 'Overdue'],
      default: 'In Progress',
    },
    hasCertificate: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const CourseProgressModel = mongoose.model('course_progresses', CourseProgressSchema);
export default CourseProgressModel;