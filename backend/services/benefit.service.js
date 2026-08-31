import benefitRepository from '../repositories/benefit.repository.js';

class BenefitService {

  async getBenefitsForEmployee(employeeId) {
    const benefits = await benefitRepository.findBenefitsByEmployeeId(employeeId);
    return benefits.map((item) => ({
      ...item,
      participantsCount: item.assignedEmployees ? item.assignedEmployees.length : 0,
    }));
  }

  async getOpenBenefits(query = {}) {
    return await benefitRepository.findOpen({
      type: query.type,
    });
  }

  async getBenefitDetail(id) {
    const benefit = await benefitRepository.findById(id);
    if (!benefit) {
      throw new Error('Không tìm thấy chương trình phúc lợi!');
    }
    return benefit;
  }

  async createBenefit(benefitData) {
    const existingBenefit = await benefitRepository.findBenefitByTitle(benefitData.title);
    if (existingBenefit) {
      throw new Error('Chính sách phúc lợi với tên này đã tồn tại!');
    }
    const payload = {
      ...benefitData,
      assignedEmployees: [],
    };

    const savedBenefit = await benefitRepository.createBenefit(payload);
    return savedBenefit;
  }

  async getBenefits() {
    const benefits = await benefitRepository.findAllBenefits();

    const formattedBenefits = benefits.map((item) => ({
      ...item,
      participantsCount: item.assignedEmployees ? item.assignedEmployees.length : 0,
    }));

    return formattedBenefits;
  }

  async updateBenefit(id, data) {
    const updated = await benefitRepository.updateBenefit(id, data);
    if (!updated) throw new Error('Không tìm thấy chính sách phúc lợi để cập nhật!');
    return updated;
  }

  async assignEmployees(id, employeeIds) {
    const updated = await benefitRepository.updateBenefit(id, { assignedEmployees: employeeIds });
    if (!updated) throw new Error('Không tìm thấy chính sách phúc lợi!');
    return updated;
  }

  async deleteBenefit(id) {
    const deleted = await benefitRepository.deleteBenefit(id);
    if (!deleted) throw new Error('Không tìm thấy chính sách phúc lợi để xóa!');
    return deleted;
  }
}

export default new BenefitService();