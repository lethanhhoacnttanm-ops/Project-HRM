import ContractModel from '../models/Contract.js';
import EmployeeModel from '../models/Employee.js';

class ContractRepository {

  async createNewContract(contractData) {
    return await ContractModel.create(contractData);
  }

  async updateEmployeeStatus(employeeId, status, role) {
    return await EmployeeModel.findByIdAndUpdate(
      employeeId,
      { status: status, role: role },
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
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      ContractModel.find()
        .populate('employee', 'fullName email code')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      ContractModel.countDocuments(),
    ]);
    return {
      data,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // ===== Employee self =====
  async findByEmployeeId(employeeId) {
    return await ContractModel.find({ employee: employeeId })
      .sort({ startDate: -1 })
      .lean();
  }
}

export default new ContractRepository();