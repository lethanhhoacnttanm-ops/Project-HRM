import PositionModel from "../models/Position.js";

class PositionRepository {

  async createNewPosition(positionDataToSave) {
    return await PositionModel.create(positionDataToSave);
  }

  async getAllposition() {
    return await PositionModel.find().lean()
  }

  //000
  async getAllPosition(department) {
    return await PositionModel.find({ departmentId: department._id})
  }
}

export default new PositionRepository();