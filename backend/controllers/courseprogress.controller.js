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

  async updateProgress(req, res) {
    try {
      const { id } = req.params; 
      const { progressPercent } = req.body;

      if (progressPercent === undefined) {
        return res.status(400).json({
          success: false,
          message: "Thiếu thông tin progressPercent!"
        });
      }

      const result = await courseprogressService.updateProgress(id, { progressPercent });

      return res.status(200).json({
        success: true,
        message: "Cập nhật tiến độ thành công!",
        data: result
      });

    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message || "Lỗi server khi cập nhật tiến độ."
      });
    }
  }
}

export default new CourseProgressController();