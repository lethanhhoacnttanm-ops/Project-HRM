import courseprogressService from "../services/courseprogress.service.js";

class CourseProgressController {
  async enrollCourse(req, res) {
    try {
      const employeeId = req.user._id; 
      
      const { courseId } = req.body;

      if (!courseId) {
        return res.status(400).json({ 
          success: false, 
          message: "Thiếu thông tin courseId khóa học!" 
        });
      }

      const progress = await courseprogressService.createEnrollment({
        employeeId,
        userSnapshot: req.user,
        courseId
      });

      return res.status(201).json({
        success: true,
        message: "Tham gia khóa học thành công!",
        data: progress
      });

    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message || "Lỗi server nội bộ khi tham gia khóa học."
      });
    }
  }

  async getAllProgressForAdmin(req, res) {
    try {
      const { page, limit } = req.query;

      const result = await courseprogressService.getAllProgressWithPagination({ page, limit });

      return res.status(200).json({
        success: true,
        message: "Lấy danh sách tiến độ học tập thành công!",
        data: result.dataCourseProgress,
        pagination: result.pagination
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Lỗi server nội bộ."
      });
    }
  }
}

export default new CourseProgressController();