import mongoose from 'mongoose';

const CourseProgressSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'employees',
      required: true
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'courses',
      required: true
    },

    assignedDepartment: { type: String, required: true },
    assignedPosition: { type: String, required: true },
    assignedLevel: { type: String, required: true },

    status: {
      type: String,
      enum: ['Not Started', 'In Progress', 'Completed'],
      default: 'Not Started'
    },
    progressPercent: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    completedAt: {
      type: Date
    }
  },
  { timestamps: true }
);

const CourseProgressModel = mongoose.model('course_progresses', CourseProgressSchema);
export default CourseProgressModel;