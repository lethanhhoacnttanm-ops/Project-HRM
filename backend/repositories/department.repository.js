import DepartmentModel from "../models/Department.js";

class DepartmentRepository {

  async createNewDepartment(departmentData) {
    return await DepartmentModel.create(departmentData);
  }

  async getAlldepartment() {
    return await DepartmentModel.find().lean()
  }

  async getInfoDepartment(id) {
    return await DepartmentModel.findById(id).populate('manager')
  }

  async updateNewManager(departmentId, managerId) {
    const updatedDepartment = await Department.findByIdAndUpdate(
      departmentId,
      { manager: managerId }, 
      { new: true, runValidators: true } 
    ).populate('manager');
    return updatedDepartment;
  }
}

export default new DepartmentRepository();