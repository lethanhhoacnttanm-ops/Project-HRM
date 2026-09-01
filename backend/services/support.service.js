import supportRepository from '../repositories/support.repository.js';

class SupportService {
  async getMyTickets(employeeId) {
    return await supportRepository.getByEmployeeId(employeeId);
  }

  async getAllTicketsForAdmin() {
    return await supportRepository.getAll();
  }

  async updateTicketByAdmin(ticketId, adminId, updateData) {
    const dataToUpdate = {
      ...updateData,
      resolvedBy: adminId,
    };
    const updated = await supportRepository.updateById(ticketId, dataToUpdate);
    if (!updated) throw new Error('Không tìm thấy yêu cầu hỗ trợ!');
    return updated;
  }

  async createTicket(employeeId, ticketData) {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const ticketCode = `TK-${randomNum}`;

    const newTicket = {
      ...ticketData,
      ticketCode,
      employee: employeeId,
    };

    return await supportRepository.create(newTicket);
  }
}

export default new SupportService();