import CandidateModel from "../models/Candidate.js";

class CandidateRepository {
  async create(candidateData) {
    const candidate = await CandidateModel.create(candidateData);
    return candidate;
  }

  async findByJobId(jobId) {
    return await CandidateModel.find({ job: jobId }).sort({ createdAt: -1 });
  }

  async findByJobAndEmail(jobId, email) {
    return await CandidateModel.findOne({ job: jobId, email }).lean();
  }

  async findByEmail(email) {
    return await CandidateModel.find({ email })
      .populate("job", "title jobCode status deadline")
      .sort({ createdAt: -1 })
      .lean();
  }
}

export default new CandidateRepository();
