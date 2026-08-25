import CandidateModel from '../models/Candidate.js';

class CandidateRepository {
  async create(candidateData) {
    const candidate = await CandidateModel.create(candidateData);
    return candidate;
  }

  async findByJobId(jobId) {
    return await CandidateModel.find({ job: jobId }).sort({ createdAt: -1 });
  }
}

export default new CandidateRepository();