import courseprogressRepository from '../repositories/courseprogress.repository.js';

class CourseProgressService {
  async createEnrollment({ employeeId, userSnapshot, courseId }) {
    const course = await courseprogressRepository.findByIdCourse(courseId);
    if (!course) {
      throw new Error("Khóa học không tồn tại trong hệ thống!");
    }

    const existingProgress = await courseprogressRepository.findByEmployeeAndCourse(employeeId, courseId);
    if (existingProgress) {
      throw new Error("Bạn đã tham gia khóa học này rồi!");
    }

    const progressPayload = {
      employeeId,
      courseId,
      assignedDepartment: userSnapshot.department,
      assignedPosition: userSnapshot.position,
      assignedLevel: userSnapshot.level || userSnapshot.targetLevel,
      status: "In Progress",
      progressPercent: 0
    };

    console.log("data here", progressPayload)

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
}

export default new CourseProgressService();