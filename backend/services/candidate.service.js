import candidateRepository from '../repositories/candidate.repository.js';
import JobModel from '../models/Job.js';

class CandidateService {

  async getApplicationsByUser(userId) {
    const applications = await candidateRepository.getByUserId(userId);
    return applications;
  }
  async createApplication({ employeeInfo, jobId, appliedPosition }) {
    const existing = await candidateRepository.findByJobAndEmail(jobId, employeeInfo.email);
    if (existing) {
      throw new Error('Bạn đã ứng tuyển vào vị trí này rồi!');
    }

    const candidateData = {
      fullName: employeeInfo.fullName,
      email: employeeInfo.email,
      phone: employeeInfo.phone || 'Chưa cập nhật',
      job: jobId,
      appliedPosition: appliedPosition,
      cvFileUrl: 'default-cv.pdf',
      stage: 'new',
    };

    return await candidateRepository.create(candidateData);
  }

  async updateCandidateStage(candidateId, newStage) {
    const updatedCandidate = await candidateRepository.updateStageById(candidateId, newStage);
    if (!updatedCandidate) {
      throw new Error('Không tìm thấy ứng viên cần chuyển bước!');
    }
    return updatedCandidate;
  }

  async fetchCandidates({ jobId }) {
    const filter = {};
    if (jobId) {
      filter.job = jobId;
    }

    const candidates = await candidateRepository.findAll(filter);
    return candidates;
  }

  async getAllCandidatesWithoutPagination() {
    return await candidateRepository.findAllWithoutPagination();
  }
}

export default new CandidateService();