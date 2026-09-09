import LeaveModel from '../models/Leave.js';

class LeaveRepository {
  async findAllWithoutPagination() {
    try {
      return await LeaveModel.find({})
        .populate('employee', 'fullName email department')
        .lean();
    } catch (error) {
      throw new Error(`Lỗi Repository (findAllWithoutPagination): ${error.message}`);
    }
  }
  async findByEmployeeId(employeeId) {
    return await LeaveModel.find({ employee: employeeId })
      .sort({ createdAt: -1 })
      .lean();
  }

  async create(data) {
    return await LeaveModel.create(data);
  }

  async FindWithPagination({ skip, limit }) {
    const [totalLeave, dataLeave] = await Promise.all([
      LeaveModel.countDocuments(),
      LeaveModel.find().populate({
        path: 'employee',
        select: 'fullName code avatarUrl'
      }).skip(skip).limit(limit).sort({ createdAt: -1 }).lean()
    ])

    return { totalLeave, dataLeave }
  }

  async updateById(id, updateData) {
    const leave = await LeaveModel.findByIdAndUpdate(id, updateData, { new: true })
      .populate('employee', 'fullName code avatar')
      .populate('approvedBy', 'fullName code role')

    return leave;
  }
}

export default new LeaveRepository();