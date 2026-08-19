import PromotionModel from "../models/Promotion.js";

class PromotionRepository {
  async createPromotion(promotionData) {
    const promotion = new PromotionModel(promotionData);
    return await promotion.save();
  }

  async findById(id) {
    return await PromotionModel.findById(id).lean();
  }

  async findAll() {
    return await PromotionModel.find().sort({ createdAt: -1 });
  }

  async updateStatus(id, updateData) {
    return await PromotionModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );
  }

  async FindWithPagination({ skip, limit, status }) {
    const query = status ? { status } : {};

    const [totalPromotion, dataPromotion] = await Promise.all([
      PromotionModel.countDocuments(query), 
      PromotionModel.find(query).skip(skip).limit(limit).lean() 
    ]);

    return { totalPromotion, dataPromotion };
  }

  async findAllListPromotion() {
    return await PromotionModel.find();
  }
}

export default new PromotionRepository();