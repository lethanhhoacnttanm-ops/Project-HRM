import courseprogressRepository from '../repositories/courseprogress.repository.js';
import EmployeeModel from '../models/Employee.js';
class CourseProgressService {
  async createEnrollment({ employeeId, courseId }) {
    const course = await courseprogressRepository.findByIdCourse(courseId);
    if (!course) {
      throw new Error("Khóa học không tồn tại trong hệ thống!");
    }

    const existingProgress = await courseprogressRepository.findByEmployeeAndCourse(employeeId, courseId);
    if (existingProgress) {
      throw new Error("Bạn đã tham gia khóa học này rồi!");
    }

    const employee = await EmployeeModel.findById(employeeId);
    if (!employee) {
      throw new Error("Không tìm thấy thông tin nhân viên trong hệ thống!");
    }

    const progressPayload = {
      employeeId,
      courseId,
      assignedDepartment: employee.department || "Chưa cập nhật",
      assignedPosition: employee.position || "Chưa cập nhật",
      assignedLevel: employee.level || employee.targetLevel || "",
      status: "In Progress",
      progressPercent: 0
    };


    const newProgress = await courseprogressRepository.saveProgress(progressPayload);
    return newProgress;
  }
  async getAllProgressWithPagination(page, limit) {
    const pageNumber = Math.max(1, parseInt(page, 10) || 1);
    const pageSize = Math.max(1, parseInt(limit, 10) || 4);
    const skip = (pageNumber - 1) * pageSize;

    const { totalCourseProgress, dataCourseProgress } = await courseprogressRepository.findWithPagination({
      skip,
      limit: pageSize
    });

    if (totalCourseProgress === undefined || dataCourseProgress === undefined) {
      throw new Error("Lỗi trường hợp lệ trong phân trang");
    }

    return {
      dataCourseProgress,
      pagination: {
        totalCourseProgress,
        pageNumber,
        pageSize,
        totalPage: Math.ceil(totalCourseProgress / pageSize)
      }
    };
  }

  async updateProgress(progressId, { progressPercent }) {
    const percent = Number(progressPercent);
    if (isNaN(percent) || percent < 0 || percent > 100) {
      throw new Error("Phần trăm tiến độ phải nằm trong khoảng từ 0 đến 100!");
    }

    let status = "In Progress";
    if (percent === 100) {
      status = "Completed";
    } else if (percent === 0) {
      status = "Not Started";
    }

    const updateData = {
      progressPercent: percent,
      status: status
    };

    const updatedProgress = await courseprogressRepository.updateProgressById(progressId, updateData);
    if (!updatedProgress) {
      throw new Error("Không tìm thấy tiến độ khóa học này!");
    }

    return updatedProgress;
  }
}

export default new CourseProgressService();