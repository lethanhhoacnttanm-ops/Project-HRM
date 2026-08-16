import departmentService from "../services/department.service.js";

class DepartmentController {
  async postNewDepartment(req, res) {
    try {
      const payload = req.body;
      const result = await departmentService.postNewDepartment(payload);
      return res.status(200).json({
        success: result.success || true,
        message: result.message || "Tạo phòng ban thành công!",
        dataDepartment: result.data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Lỗi máy chủ khi tạo phòng ban!",
        error: error.message,
      });
    }
  }

  async getAllListDepartment(req, res) {
    try {
      const result = await departmentService.getListDepartment();
      return res.status(200).json({
        success: result.success || true,
        message: result.message || "Lấy danh sách phòng ban thành công!",
        dataList: result.data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Lỗi máy chủ khi tạo phòng ban!",
        error: error.message,
      });
    }
  }

  async putNewManagerToDepartment(req, res) {
    try {
      const { manager, departments } = req.body;

      const updatedManager = await departmentService.putNewManager( departments, manager )

      return res.status(200).json({
        success: true,
        message: "Gán trưởng phòng vào phòng ban thành công!",
        data: updatedManager
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  };

  async getAllDepartmentDetailt(req, res) {
    try {

      const { id } = req.params;

      const result = await departmentService.getDepartmentDetail(id);
      return res.status(200).json({
        success: result.success || true,
        message: result.message || "Hoàn thành hợp thể thông tin phòng ban",
        dataList: result.data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Lỗi máy chủ khi hợp thể thông tin phòng ban!",
        error: error.message,
      });
    }
  }
}

export default new DepartmentController();
