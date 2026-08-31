import EmployeeModel from "../models/Employee.js";

class EmployeeRepository {

  async FindWithPagination({ skip, limit, filter = {} }) {
    const [totalEmp, dataEmp] = await Promise.all([
      EmployeeModel.countDocuments(filter),
      EmployeeModel.find(filter).skip(skip).limit(limit).populate({ path: 'position', select: 'name' }).populate({ path: 'department', select: 'name' }).lean()
    ])

    return { totalEmp, dataEmp }
  }

  async findAllEmployees() {
    return await EmployeeModel.find({ role: { $ne: 'ADMIN' } });
  }

  async findAllDataEmp(filter = {}) {
    try {
      return await EmployeeModel.find(filter).lean();
    } catch (error) {
      throw new Error(`Lỗi Repository: ${error.message}`);
    }
  }

  async findAllDataEmpForBenefit(filter = {}) {
    try {
      return await EmployeeModel.find(filter).populate({ path: 'department', select: 'name'}).lean();
    } catch (error) {
      throw new Error(`Lỗi Repository: ${error.message}`);
    }
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
    return await EmployeeModel.findOne({ email }).select("+password");
  }

  async findById(id) {
    return await EmployeeModel.findById(id).lean();
  }

  async findByRole(role) {
    return await EmployeeModel.findOne({ role });
  }

  async findByIdWithPassword(id) {
    return await EmployeeModel.findById(id).select("+password");
  }

  async updatedEmploye(id, payload) {
    const result = await EmployeeModel.findByIdAndUpdate(
      id,
      payload,
      { new: true, runValidators: true }
    )
      .populate('department')
      .populate('position')
      .lean();

    return result;
  }

  async updateEmployeeLevel(employeeId, newLevel) {
    return await EmployeeModel.findByIdAndUpdate(
      employeeId,
      { $set: { level: newLevel } },
      { new: true }
    );
  }

  async updateEditFileById(id, payload) {
    const result = await EmployeeModel.findByIdAndUpdate(
      id,
      payload,
      { new: true, runValidators: true }
    ).lean();

    return result;
  }

  async updateById(id, data) {
    return await EmployeeModel.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true },
    ).select("-password");
  }
}

export default new EmployeeRepository();
