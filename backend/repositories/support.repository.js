import SupportTicketModel from '../models/SupportTicket.js';

class SupportRepository {
  async getByEmployeeId(employeeId) {
    return await SupportTicketModel.find({ employee: employeeId })
      .populate('employee', 'fullName email')
      .populate('resolvedBy', 'fullName')
      .sort({ createdAt: -1 })
      .lean();
  }

  async getAll() {
    return await SupportTicketModel.find({})
      .populate('employee', 'fullName email department')
      .populate('resolvedBy', 'fullName')
      .sort({ createdAt: -1 })
      .lean();
  }

  async updateById(id, updateData) {
    return await SupportTicketModel.findByIdAndUpdate(id, updateData, { new: true })
      .populate('employee', 'fullName email')
      .populate('resolvedBy', 'fullName')
      .lean();
  }

  async create(data) {
    return await SupportTicketModel.create(data);
  }

  async countAll() {
    return await SupportTicketModel.countDocuments();
  }
}

export default new SupportRepository();