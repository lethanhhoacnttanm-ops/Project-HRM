import courseRepository from "../repositories/course.repository.js";

class CourseService {
  async createNewCourse(data) {
    const { title, courseUrl, department, position, targetLevel, description, durationHours, imageUrl } = data;

    if (!title || !courseUrl || !department || !position || !targetLevel) {
      throw new Error("Vui lòng điền đầy đủ các trường thông tin bắt buộc!");
    }

    const coursePayload = {
      title: title.trim(),
      description: description ? description.trim() : "",
      imageUrl: imageUrl ? imageUrl.trim() : "",
      courseUrl: courseUrl.trim(),
      durationHours: durationHours ? Number(durationHours) : 0,
      department,
      position,
      targetLevel
    };

    const savedCourse = await courseRepository.saveCourse(coursePayload);
    return savedCourse;
  }

  async getAllCourse({ page, limit }) {
    const pageNumber = Math.max(1, parseInt(page, 10) || 1);
    const pageSize = Math.max(1, parseInt(limit, 10) || 4);
    const skip = (pageNumber - 1) * pageSize;

    const { totalCourse, dataCourse } = await courseRepository.FindWithPagination({
      skip,
      limit: pageSize
    });


    if (totalCourse === undefined || dataCourse === undefined) {
      throw new Error("Lỗi trường hợp lệ trong phân trang");
    }

    return {
      dataCourse,
      pagination: {
        totalCourse,
        pageNumber,
        pageSize,
        totalPage: Math.ceil(totalCourse / pageSize)
      }
    };
  }
}

export default new CourseService();
