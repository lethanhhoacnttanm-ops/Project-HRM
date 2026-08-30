import PerformanceModel from '../models/Performance.js';

class PerformanceRepository {

  async FindWithPagination({ skip, limit }) {
    const [totalPerformance, dataPerformance] = await Promise.all([
      PerformanceModel.countDocuments(),
      PerformanceModel.find()
        .populate({
          path: 'employee',
          select: 'fullName code avatarUrl department',
          populate: {
            path: 'department',   
            select: 'name'   
          }
        })
        .populate({
          path: 'evaluator',
          select: 'fullName code role'
        })
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .lean()
    ]);

    return { totalPerformance, dataPerformance };
  }

  async findAllWithRelations() {
    return await PerformanceModel.find()
      .populate({
        path: 'employee',
        select: 'fullName code department',
        populate: {
          path: 'department',
          select: '_id name code'
        }
      })
      .populate({
        path: 'evaluator',
        select: 'fullName code'
      });
  }

  async findByEmployeeId(employeeId) {
    return await PerformanceModel.find({ employee: employeeId })
      .populate('evaluator', 'fullName email code')
      .sort({ createdAt: -1 })
      .lean();
  }

  async findByIdForEmployee(id, employeeId) {
    return await PerformanceModel.findOne({
      _id: id,
      employee: employeeId,
    })
      .populate('evaluator', 'fullName email code')
      .lean();
  }

  async findByQuarter(quarter) {
    return await PerformanceModel.find({ quarter });
  }

  async findOneByEmployeeAndQuarter(employeeId, quarter) {
    return await PerformanceModel.findOne({ employee: employeeId, quarter });
  }

  async updateSelfAssessment(employeeId, quarter, updateData) {
    return await PerformanceModel.findOneAndUpdate(
      { employee: employeeId, quarter },
      { $set: updateData },
      { new: true }
    );
  }

  async insertMany(records) {
    return await PerformanceModel.insertMany(records);
  }

  async create(data) {
    const performance = await PerformanceModel.create(data);

    return await PerformanceModel.findById(performance._id)
      .populate('employee', 'fullName code avatar')
      .populate('evaluator', 'fullName code role');
  }
}

export default new PerformanceRepository();