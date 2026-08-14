import ContractModel from '../models/Contract.js';
import EmployeeModel from '../models/Employee.js';

class ContractRepository {

  async createNewContract(contractData) {
    return await ContractModel.create(contractData);
  }

  async updateEmployeeStatus(employeeId, status, role, code) {
    return await EmployeeModel.findByIdAndUpdate(
      employeeId,
      { status: status, role: role, code: code },
      { new: true }
    );
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

  async findAll({ page = 1, limit = 10 }) {
    const pageNum = Math.max(1, Number(page) || 1);
    const limitNum = Math.max(1, Number(limit) || 10);
    const skip = (pageNum - 1) * limitNum;

    const [data, total] = await Promise.all([
      ContractModel.find()
        .populate('employee', 'fullName email code')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum),
      ContractModel.countDocuments(),
    ]);

    return {
      data,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    };
  }

  // ===== Employee self =====
  async findByEmployeeId(employeeId) {
    return await ContractModel.find({ employee: employeeId })
      .sort({ startDate: -1 })
      .lean();
  }

  // Bổ sung phương thức cập nhật trạng thái nhân viên
  async updateEmployeeStatus(employeeId, status, role) {
    return await EmployeeModel.findByIdAndUpdate(
      employeeId,
      { status, role },
      { new: true }
    );
  }
}

export default new ContractRepository();