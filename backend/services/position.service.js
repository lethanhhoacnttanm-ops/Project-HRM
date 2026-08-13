import positionRepository from "../repositories/position.repository.js";

class PositionService {
  async postNewPosition(payload) {

    const positionDataToSave = {
      ...payload,
    };

    const newPosition = await positionRepository.createNewPosition(positionDataToSave);

    return {
      success: true,
      message: "Tạo vị trí cho phòng ban thành công",
      data: newPosition,
    };
  }

  async getListPosition() {
    const listAll = await positionRepository.getAllposition()

    return {
      success: true,
      message: "Lấy toàn bộ danh sách thành công",
      data: listAll
    }
  }
}

export default new PositionService();
