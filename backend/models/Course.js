import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: {
      type: String,
      enum: ['SỰ TUÂN THỦ', 'KỸ NĂNG MỀM', 'KỸ THUẬT'],
      required: true,
    },
    duration: { type: String, required: true }, 
    modulesCount: { type: Number, default: 1 },
    tag: {
      type: String,
      enum: ['Bắt buộc', 'Môn tự chọn', 'Trình độ cao', 'Thiết yếu'],
      default: 'Môn tự chọn',
    },
    coverImage: { type: String, default: '' },
  },
  { timestamps: true }
);

const CourseModel = mongoose.model('courses', CourseSchema);
export default CourseModel;