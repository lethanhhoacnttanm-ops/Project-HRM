import candidateRepository from '../repositories/candidate.repository.js';
import JobModel from '../models/Job.js'; 

class CandidateService {
  async createCandidateApplication(data) {
    const { jobId, fullName, email, phone, appliedPosition, cvFileUrl } = data;

    const job = await JobModel.findById(jobId);
    if (!job) {
      const error = new Error('Không tìm thấy bài đăng công việc này.');
      error.statusCode = 404;
      throw error;
    }

    const positionIsValid = job.positions?.some(
      pos => pos.role === appliedPosition.role && pos.level === appliedPosition.level
    );

    if (!positionIsValid) {
      const error = new Error('Vị trí tuyển dụng không hợp lệ hoặc đã thay đổi.');
      error.statusCode = 400;
      throw error;
    }

    const candidatePayload = {
      fullName,
      email,
      phone,
      job: jobId,
      appliedPosition,
      cvFileUrl: cvFileUrl || 'default_cv.pdf',
      stage: 'new'
    };

    const savedCandidate = await candidateRepository.create(candidatePayload);
    return savedCandidate;
  }

  async getCandidatesByJobId(jobId) {
    if (!jobId || !jobId.match(/^[0-9a-fA-F]{24}$/)) {
      const error = new Error('Mã dự án (jobId) không hợp lệ');
      error.statusCode = 400;
      throw error;
    }
    const candidates = await candidateRepository.findByJobId(jobId);
    return candidates;
  }
}

export default new CandidateService();