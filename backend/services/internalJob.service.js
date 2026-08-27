import jobsRepository from '../repositories/jobs.repository.js';
import candidateRepository from '../repositories/candidate.repository.js';
import employeeRepository from '../repositories/employee.repository.js';

class InternalJobService {
  async getOpenJobs() {
    return await jobsRepository.findActiveJobs();
  }

  async getJobDetail(jobId) {
    const job = await jobsRepository.findActiveById(jobId);
    if (!job) {
      throw new Error('Không tìm thấy vị trí tuyển dụng!');
    }
    return job;
  }

  async applyToJob(employeeId, payload) {
    const { jobId, role, level, cvFileUrl } = payload;

    if (!jobId || !role || !level) {
      throw new Error('Vui lòng chọn vị trí (role/level) cần ứng tuyển!');
    }
    if (!cvFileUrl?.trim()) {
      throw new Error('Vui lòng cung cấp link CV!');
    }

    const employee = await employeeRepository.findById(employeeId);
    if (!employee) {
      throw new Error('Không tìm thấy thông tin nhân viên!');
    }

    const job = await jobsRepository.findActiveById(jobId);
    if (!job) {
      throw new Error('Vị trí tuyển dụng không còn hiệu lực!');
    }

    const validPosition = (job.positions || []).some(
      (p) => p.role === role && p.level === level
    );
    if (!validPosition) {
      throw new Error('Vị trí/cấp bậc không thuộc tin tuyển dụng này!');
    }

    const existed = await candidateRepository.findByJobAndEmail(
      jobId,
      employee.email
    );
    if (existed) {
      throw new Error('Bạn đã ứng tuyển vị trí này rồi!');
    }

    return await candidateRepository.create({
      fullName: employee.fullName,
      email: employee.email,
      phone: employee.phone || 'Chưa cập nhật',
      job: jobId,
      appliedPosition: { role, level },
      cvFileUrl: cvFileUrl.trim(),
      stage: 'new',
      appliedDate: new Date(),
    });
  }

  async getMyApplications(employeeId) {
    const employee = await employeeRepository.findById(employeeId);
    if (!employee) {
      throw new Error('Không tìm thấy nhân viên!');
    }
    return await candidateRepository.findByEmail(employee.email);
  }
}

export default new InternalJobService();