import BenefitModel from '../models/Benefit.js';

class BenefitRepository {

  async findBenefitsByEmployeeId(employeeId) {
  try {
    return await BenefitModel.find({ assignedEmployees: employeeId })
      .populate('assignedEmployees', 'fullName email')
      .sort({ createdAt: -1 })
      .lean();
  } catch (error) {
    throw new Error(`Lỗi Repository: ${error.message}`);
  }
}

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

  async createBenefit(benefitData) {
    try {
      return await BenefitModel.create(benefitData);
    } catch (error) {
      throw new Error(`Lỗi Repository (Create Benefit): ${error.message}`);
    }
  }

  async findBenefitByTitle(title) {
    try {
      return await BenefitModel.findOne({ title }).lean();
    } catch (error) {
      throw new Error(`Lỗi Repository (Find By Title): ${error.message}`);
    }
  }

  async findAllBenefits() {
    try {
      return await BenefitModel.find()
        .populate('assignedEmployees')
        .sort({ createdAt: -1 })
        .lean();
    } catch (error) {
      throw new Error(`Lỗi Repository (Find All Benefits): ${error.message}`);
    }
  }

  async updateBenefit(id, data) {
    return await BenefitModel.findByIdAndUpdate(id, data, { new: true }).lean();
  }

  async deleteBenefit(id) {
    return await BenefitModel.findByIdAndDelete(id).lean();
  }
}

export default new BenefitRepository();