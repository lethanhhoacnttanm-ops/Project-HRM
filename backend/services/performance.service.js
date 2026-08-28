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

  async createPerformance(data, evaluatorId) {
    const { employee, quarter, outsourcingScore, trainingScore, feedback } = data;

    const outsourcing = Number(outsourcingScore) || 0;
    const training = Number(trainingScore) || 0;

    const performanceData = {
      employee,
      evaluator: evaluatorId,
      quarter,
      outsourcingScore: outsourcing,
      trainingScore: training,
      feedback: feedback || '',
    };

    const savedPerformance = await performanceRepository.create(performanceData);
    return savedPerformance;
  };

  async getAllPerformance({ page, limit }) {
    const pageNumber = Math.max(1, parseInt(page, 10) || 1);
    const pageSize = Math.max(1, parseInt(limit, 10) || 8);
    const skip = (pageNumber - 1) * pageSize;

    const { totalPerformance, dataPerformance } = await performanceRepository.FindWithPagination({
      skip,
      limit: pageSize
    });


    if (totalPerformance === undefined || dataPerformance === undefined) {
      throw new Error("Lỗi trường hợp lệ trong phân trang");
    }

    return {
      dataPerformance,
      pagination: {
        totalPerformance,
        pageNumber,
        pageSize,
        totalPage: Math.ceil(totalPerformance / pageSize)
      }
    };
  }

  async getTeamPerformanceSummary() {
    const performances = await performanceRepository.findAllWithRelations();

    const departmentMap = {};

    performances.forEach((item) => {
      const employee = item.employee;
      if (!employee || !employee.department) return;

      const deptId = employee.department._id.toString();
      const deptName = employee.department.name;
      const empId = employee._id.toString();

      if (!departmentMap[deptId]) {
        departmentMap[deptId] = {
          departmentId: deptId,
          departmentName: deptName,
          membersMap: new Set(),
          totalOutsourcing: 0,
          totalTraining: 0,
          sumOverallScore: 0,
          evaluationCount: 0,
        };
      }

      const outsourcing = Number(item.outsourcingScore) || 0;
      const training = Number(item.trainingScore) || 0;

      const individualOverall = (outsourcing + training) / 2;

      departmentMap[deptId].membersMap.add(empId);
      departmentMap[deptId].totalOutsourcing += outsourcing;
      departmentMap[deptId].totalTraining += training;
      departmentMap[deptId].sumOverallScore += individualOverall;
      departmentMap[deptId].evaluationCount += 1;
    });

    const result = Object.values(departmentMap).map((dept) => {
      const count = dept.evaluationCount || 1;

      return {
        departmentId: dept.departmentId,
        departmentName: dept.departmentName,
        memberCount: dept.membersMap.size,

        avgOutsourcingScore: Number((dept.totalOutsourcing / count).toFixed(1)),

        avgTrainingScore: Number((dept.totalTraining / count).toFixed(1)),

        departmentOverallScore: Number(dept.sumOverallScore.toFixed(1)),
      };
    });

    return result;
  };
}

export default new PerformanceService();