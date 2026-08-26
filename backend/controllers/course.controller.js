import courseService from "../services/course.service.js";

class CourseController {
  async createCourse(req, res) {
    try {
      const newCourse = await courseService.createNewCourse(req.body);

      return res.status(201).json({
        success: true,
        message: "Tạo khóa học mới vào lộ trình thành công!",
        data: newCourse
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message || "Lỗi Server nội bộ khi tạo khóa học."
      });
    }
  }
  async getAllCourses(req, res) {
    try {
      const { page, limit } = req.query;
      const result = await courseService.getAllCourse({ page, limit });
      return res.status(200).json({
        success: true,
        message: 'Lấy danh sách khóa học thành công!',
        dataCourse: result.dataCourse || result,
        pagination: result.pagination || {}
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Lỗi máy chủ khi lấy danh sách khóa học!',
        error: error.message,
      });
    }
  };
}

export default new CourseController();
