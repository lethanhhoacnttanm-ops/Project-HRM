import performanceRepository from '../repositories/performance.repository.js';

class PerformanceService {
  async getMyEvaluations(employeeId) {
    return await performanceRepository.findByEmployeeId(employeeId);
  }

  async getMyEvaluationDetail(employeeId, id) {
    const evaluation = await performanceRepository.findByIdForEmployee(
      id,
      employeeId
    );
    if (!evaluation) {
      throw new Error('Không tìm thấy đánh giá hiệu suất!');
    }
    return evaluation;
  }
}

export default new PerformanceService();