import ContractModel from '../models/Contract.js';
import EmployeeModel from '../models/Employee.js';

class ContractRepository {

  async createNewContract(contractData) {
    return await ContractModel.create(contractData);
  }

  async updateEmployeeStatus(employeeId, status, role, code) {
    console.log("Đang update nhân viên ID:", employeeId);
    console.log("Mã nhân viên mới sinh ra:", code);
    const updatedEmp = await EmployeeModel.findByIdAndUpdate(
      employeeId,
      { status: status, role: role, code: code },
      { new: true, runValidators: true }
    );

    console.log("Kết quả sau khi update:", updatedEmp);
    return updatedEmp;
  }

  async getAllContract({ skip, limit }) {
    const [totalContract, dataContract] = await Promise.all([
      ContractModel.countDocuments(),
      ContractModel.find().populate("employee").skip(skip).limit(limit).lean()
    ])

    return { totalContract, dataContract }
  };

  async create(data) {
    return await ContractModel.create(data);
  }

  async findAll({ skip, limit }) {

    const [dataContract, totalContract] = await Promise.all([
      ContractModel.find()
        .populate('employee', 'fullName email code')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      ContractModel.countDocuments(),
    ]);

    return { dataContract, totalContract }
  }

  async findByEmployeeId(employeeId) {
    return await ContractModel.find({ employee: employeeId })
      .sort({ startDate: -1 })
      .lean();
  }

  async updateEmployeeStatus(employeeId, status, role) {
    return await EmployeeModel.findByIdAndUpdate(
      employeeId,
      { status, role },
      { new: true }
    );
  }
}

export default new ContractRepository();