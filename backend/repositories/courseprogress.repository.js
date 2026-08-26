import CourseProgressModel from "../models/CourseProgress.js";
import CourseModel from "../models/Course.js";
import EmployeeModel from "../models/Employee.js";

class CourseProgressRepository {
  async findByEmployeeAndCourse(employeeId, courseId) {
    try {
      return await CourseProgressModel.findOne({ employeeId, courseId });
    } catch (error) {
      throw new Error(`Lỗi Repository (Find): ${error.message}`);
    }
  }
  async findByIdCourse(courseId) {
    try {
      return await CourseModel.findById(courseId);
    } catch (error) {
      throw new Error(`Lỗi Repository (FindById): ${error.message}`);
    }
  }
  async saveProgress(progressData) {
    try {
      const progress = new CourseProgressModel(progressData);
      return await progress.save();
    } catch (error) {
      throw new Error(`Lỗi Repository (Save): ${error.message}`);
    }
  }

  async findWithPagination(skip, limit) {
    try {
      const [totalCourseProgress, dataCourseProgress] = await Promise.all([
        CourseProgressModel.countDocuments(),
        CourseProgressModel.find()
          .populate({
            path: 'employeeId',
            select: 'fullName email avatarUrl position department level'
          })
          .populate({
            path: 'courseId',
            select: 'title department durationHours targetLevel'
          })
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit).lean()
      ])

      return { totalCourseProgress, dataCourseProgress };
    } catch (error) {
      throw new Error(`Lỗi Repository (FindWithPagination): ${error.message}`);
    }
  }

}

export default new CourseProgressRepository();