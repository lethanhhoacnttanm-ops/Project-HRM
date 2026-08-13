import DepartmentModel from "../models/Department.js";

class DepartmentRepository {

  async createNewDepartment(departmentData) {
    return await DepartmentModel.create(departmentData);
  }

  async getAlldepartment() {
    return await DepartmentModel.find().lean()
  }

  //000
  async getInfoDepartment(id) {
    return await DepartmentModel.findById(id).populate('manager')
  }
}

export default new DepartmentRepository();