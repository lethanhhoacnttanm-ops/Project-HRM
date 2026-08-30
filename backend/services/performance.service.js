import performanceRepository from '../repositories/performance.repository.js';
import EmployeeModel from '../models/Employee.js';

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

  async createCycleForEmployees(quarter, adminId) {
    const employees = await EmployeeModel.find({ status: 'active' });

    if (!employees || employees.length === 0) {
      throw new Error("Không tìm thấy nhân viên nào trong hệ thống để tạo chu kỳ!");
    }

    const existing = await performanceRepository.findByQuarter(quarter);
    if (existing && existing.length > 0) {
      throw new Error(`Chu kỳ ${quarter} đã được khởi tạo trước đó rồi!`);
    }

    const performanceRecords = employees.map((emp) => ({
      employee: emp._id,
      evaluator: adminId,
      quarter: quarter,
      selfAssessment: { outsourcingScore: 0, trainingScore: 0, feedback: '' },
      outsourcingScore: 0,
      trainingScore: 0,
      feedback: '',
      status: 'Draft',
    }));

    return await performanceRepository.insertMany(performanceRecords);
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

  async getMyReview(employeeId, quarter) {
    const review = await performanceRepository.findOneByEmployeeAndQuarter(employeeId, quarter);
    if (!review) {
      throw new Error(`Không tìm thấy bản ghi đánh giá cho chu kỳ ${quarter}!`);
    }
    return review;
  }

  async submitSelfAssessment(employeeId, quarter, selfData) {
    const review = await performanceRepository.findOneByEmployeeAndQuarter(employeeId, quarter);
    if (!review) {
      throw new Error("Không tìm thấy thông tin đánh giá kỳ này!");
    }

    if (review.status === 'Approved') {
      throw new Error("Bảng đánh giá này đã được Admin chốt, không thể thay đổi thêm!");
    }

    const updated = await performanceRepository.updateSelfAssessment(employeeId, quarter, {
      selfAssessment: {
        outsourcingScore: selfData.outsourcingScore,
        trainingScore: selfData.trainingScore,
        feedback: selfData.feedback,
      },
      status: 'Submitted' 
    });

    return updated;
  }

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