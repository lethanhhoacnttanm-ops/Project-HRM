import shiftService from "../services/shift.service.js";

class ShiftController {
  async create(req, res) {
    try {
      const result = await shiftService.createShift(req.body);
      return res.status(201).json({
        success: true,
        message: "Tạo ca làm việc thành công!",
        data: result.data
      });
    } catch (error) {
      console.error("Lỗi Controller tạo ca:", error);
      return res.status(500).json({
        success: false,
        message: error.message || "Lỗi server nội bộ!"
      });
    }
  }
  async getAllShift(req, res) {
    try {
      const { page, limit } = req.query;
      const result = await shiftService.getAllShift({ page, limit });
      return res.status(200).json({
        success: true,
        message: 'Lấy danh sách ca quản lý thành công!',
        dataShift: result.dataShift || result,
        pagination: result.pagination || {}
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Lỗi máy chủ khi lấy danh sách ca quản lý!',
        error: error.message,
      });
    }
  };
}

export default new ShiftController();