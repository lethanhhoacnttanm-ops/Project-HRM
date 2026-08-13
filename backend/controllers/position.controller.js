import positionService from "../services/position.service.js";

class PositionController {
  async postNewPosition(req, res) {
    try {
      const payload = req.body;
      const result = await positionService.postNewPosition(payload);
      return res.status(200).json({
        success: result.success || true,
        message: result.message || "Tạo vị trí cho phòng ban thành công!",
        dataPosition: result.data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Lỗi máy chủ khi tạo vị trí!",
        error: error.message,
      });
    }
  }

  async getAllListPosition(req, res) {
    try {
      const result = await positionService.getListPosition();
      return res.status(200).json({
        success: result.success || true,
        message: result.message || "Lấy danh sách vị trí cho phòng ban thành công!",
        dataList: result.data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Lỗi máy chủ khi tạo vị trí!",
        error: error.message,
      });
    }
  }
}

export default new PositionController();
