import SupportTicketModel from '../models/SupportTicket.js';

class SupportRepository {
  async findByEmployeeId(employeeId) {
    return await SupportTicketModel.find({ employee: employeeId })
      .sort({ createdAt: -1 })
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