import EmployeeModel from "../models/Employee.js";

class EmployeeRepository {

  async FindWithPagination({ skip, limit, filter = {}}) {

    const [totalEmp, dataEmp] = await Promise.all([
      EmployeeModel.countDocuments(filter),
      EmployeeModel.find(filter).skip(skip).limit(limit).lean()
    ])

    return {totalEmp, dataEmp}
  }

  async findAllEmpoyees() {
    return await EmployeeModel.find();
  }

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

  async findByRole(role) {
    return await EmployeeModel.findOne({ role })
  }
}

export default new EmployeeRepository();