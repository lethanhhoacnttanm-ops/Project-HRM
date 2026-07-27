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
}

export default new EmployeeRepository();