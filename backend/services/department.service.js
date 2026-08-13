import departmentRepository from "../repositories/department.repository.js";
import positionRepository from "../repositories/position.repository.js";

class DepartmentService {
  async postNewDepartment(payload) {

    const departmentDataToSave = {
      ...payload,
    };

    const newDepartment = await departmentRepository.createNewDepartment(departmentDataToSave);

    return {
      success: true,
      message: "Tạo phòng ban thành công",
      data: newDepartment,
    };
  }

  async getListDepartment() {
    const listAll = await departmentRepository.getAlldepartment()

    return {
      success: true,
      message: "Lấy toàn bộ danh sách thành công",
      data: listAll
    }
  }

  async getDepartmentDetail(id) {
    const department = await departmentRepository.getInfoDepartment(id);
    if (!department) {
      return res.status(404).json({ success: false, message: "Không tìm thấy phòng ban!" });
    }

    const positions = await positionRepository.getAllPosition(department);

    return res.status(200).json({
      success: true,
      message: "Hoàn thành hợp thể thông tin phòng ban",
      data: {
        ...department.toObject(),
        positions
      }
    });
  }
}

export default new DepartmentService();
