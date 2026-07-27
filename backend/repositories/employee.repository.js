import EmployeeModel from "../models/Employee.js";

class EmployeeRepository {
  async findByEmail(email) {
    return await EmployeeModel.findOne({ email });
  }

  async findByIdentityCard(identityCard) {
    return await EmployeeModel.findOne({ identityCard });
  }

  async create(employeeData) {
    const employee = new EmployeeModel(employeeData);
    return await employee.save();
  }

  async findByEmailWithPassword(email) {
    return await EmployeeModel.findOne({ email }).select('+password');
  }

  async findById(id) {
    return await EmployeeModel.findById(id);
  }
}

export default new EmployeeRepository();