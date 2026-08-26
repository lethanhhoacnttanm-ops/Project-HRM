import CourseModel from "../models/Course.js";

class CourseRepository {
  async saveCourse(courseData) {
    try {
      const course = new CourseModel(courseData);
      return await course.save();
    } catch (error) {
      throw new Error(`Lỗi Database: ${error.message}`);
    }
  }

  async FindWithPagination({ skip, limit }) {
    const [totalCourse, dataCourse] = await Promise.all([
      CourseModel.countDocuments(),
      CourseModel.find().skip(skip).limit(limit).lean()
    ])

    return { totalCourse, dataCourse }
  }
}

export default new CourseRepository();