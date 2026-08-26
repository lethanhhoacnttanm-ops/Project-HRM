import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    imageUrl: {
      type: String,
      default: "",
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    provider: {
      type: String,
      default: 'Udemy Business'
    },
    courseUrl: {
      type: String,
      required: true,
      trim: true
    },
    durationHours: {
      type: Number,
      default: 0
    },
    instructorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'employees',
      default: null
    },
    department: {
      type: String,
      required: true,
      enum: [
        "Software Development",
        "QA/QC",
        "Business Analysis & Product",
        "UI/UX Design",
        "DevOps & System"
      ]
    },
    position: {
      type: String,
      required: true,
      trim: true
    },
    targetLevel: {
      type: String,
      required: true,
      enum: ["Intern", "Fresher", "Junior", "Middle"]
    }
  },
  { timestamps: true }
);

const CourseModel = mongoose.model('courses', CourseSchema);
export default CourseModel;