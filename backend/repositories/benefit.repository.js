import BenefitModel from '../models/Benefit.js';

class BenefitRepository {
  async findOpen({ type } = {}) {
    const filter = { status: 'Đang mở' };
    if (type) filter.type = type;

    return await BenefitModel.find(filter)
      .sort({ createdAt: -1 })
      .lean();
  }

  async findById(id) {
    return await BenefitModel.findById(id).lean();
  }
}

export default new BenefitRepository();