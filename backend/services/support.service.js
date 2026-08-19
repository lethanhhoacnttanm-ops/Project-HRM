import supportRepository from '../repositories/support.repository.js';

const generateTicketCode = async () => {
  const count = await supportRepository.countAll();
  const num = String(count + 1).padStart(5, '0');
  return `TK-${num}`;
};

class SupportService {
  async getMyTickets(employeeId) {
    return await supportRepository.findByEmployeeId(employeeId);
  }

  async createTicket(employeeId, payload) {
    const { issue, category, priority } = payload;

    if (!issue?.trim()) {
      throw new Error('Vui lòng nhập nội dung vấn đề!');
    }

    const ticketCode = await generateTicketCode();

    return await supportRepository.create({
      ticketCode,
      employee: employeeId,
      issue: issue.trim(),
      category: category || 'Công nghệ thông tin',
      priority: priority || 'Trung bình',
      status: 'Mở',
    });
  }
}

export default new SupportService();