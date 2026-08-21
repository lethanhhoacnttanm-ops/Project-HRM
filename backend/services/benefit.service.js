import benefitRepository from '../repositories/benefit.repository.js';

class BenefitService {
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
}

export default new BenefitService();