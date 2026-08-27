import attendanceRepository from '../repositories/attendance.repository.js';
import leaveRepository from '../repositories/leave.repository.js';
import payrollRepository from '../repositories/payroll.repository.js';
import performanceRepository from '../repositories/performance.repository.js';
import promotionRepository from '../repositories/promotion.repository.js';
import employeeRepository from '../repositories/employee.repository.js';

class ReportService {
  async getMyReport(employeeId, { month, year } = {}) {
    const now = new Date();
    const m = Number(month) || now.getMonth() + 1;
    const y = Number(year) || now.getFullYear();

    const employee = await employeeRepository.findById(employeeId);
    if (!employee) {
      throw new Error('Không tìm thấy nhân viên!');
    }

    // Chạy song song các nguồn data
    const [attendances, leaves, payrolls, performances, promotions] =
      await Promise.all([
        attendanceRepository.findByEmployeeId(employeeId, {
          month: m,
          year: y,
        }),
        leaveRepository.findByEmployeeId(employeeId),
        payrollRepository.findByEmployeeId(employeeId),
        performanceRepository.findByEmployeeId(employeeId),
        promotionRepository.findByEmployeeId(employeeId),
      ]);

    // --- Attendance stats ---
    const attendanceStats = {
      month: m,
      year: y,
      total: attendances.length,
      onTime: attendances.filter((a) => a.status === 'Đúng giờ').length,
      late: attendances.filter((a) => a.status === 'Đi muộn').length,
      absent: attendances.filter((a) => a.status === 'Vắng mặt').length,
      earlyLeave: attendances.filter((a) => a.status === 'Về sớm').length,
    };

    // --- Leave stats ---
    const approvedLeaves = leaves.filter((l) => l.status === 'Đã duyệt');
    const pendingLeaves = leaves.filter((l) => l.status === 'Chờ duyệt');
    const leaveStats = {
      totalRequests: leaves.length,
      pending: pendingLeaves.length,
      approved: approvedLeaves.length,
      approvedDays: approvedLeaves.reduce(
        (sum, l) => sum + (l.numberOfDays || 0),
        0
      ),
    };

    // --- Latest payroll ---
    const latestPayroll = payrolls[0] || null;
    const payrollSummary = latestPayroll
      ? {
          monthYear: latestPayroll.monthYear,
          baseSalary: latestPayroll.baseSalary,
          allowance: latestPayroll.allowance,
          bonus: latestPayroll.bonus,
          deductions: latestPayroll.deductions,
          netSalary: latestPayroll.netSalary,
        }
      : null;

    // --- Latest performance ---
    const latestPerformance = performances[0] || null;
    const performanceSummary = latestPerformance
      ? {
          quarter: latestPerformance.quarter,
          score: latestPerformance.score,
          status: latestPerformance.status,
          feedback: latestPerformance.feedback || '',
        }
      : null;

    // --- Latest promotion ---
    const latestPromotion = promotions[0] || null;
    const promotionSummary = latestPromotion
      ? {
          currentLevel: latestPromotion.currentLevel,
          proposedLevel: latestPromotion.proposedLevel,
          status: latestPromotion.status,
          currentPosition: latestPromotion.currentPosition,
        }
      : null;

    return {
      employee: {
        fullName: employee.fullName,
        code: employee.code || employee.employeeCode || '',
        email: employee.email,
        position: employee.position || '',
        role: employee.role,
      },
      period: { month: m, year: y },
      attendance: attendanceStats,
      leave: leaveStats,
      payroll: payrollSummary,
      performance: performanceSummary,
      promotion: promotionSummary,
    };
  }
}

export default new ReportService();