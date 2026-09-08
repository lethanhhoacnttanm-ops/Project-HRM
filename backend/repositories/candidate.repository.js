import CandidateModel from "../models/Candidate.js";

class CandidateRepository {
  async create(data) {
    try {
      return await CandidateModel.create(data);
    } catch (error) {
      throw new Error(`Lỗi Repository (create): ${error.message}`);
    }
  }

  async findByJobId(jobId) {
    return await CandidateModel.find({ job: jobId }).sort({ createdAt: -1 });
  }

  async findByJobAndEmail(jobId, email) {
    try {
      return await CandidateModel.findOne({ job: jobId, email }).lean();
    } catch (error) {
      throw new Error(`Lỗi Repository (findByJobAndEmail): ${error.message}`);
    }
  }

  async findAll(filter = {}) {
    try {
      return await CandidateModel.find(filter)
        .populate('job', 'title jobCode client') 
        .lean();
    } catch (error) {
      throw new Error(`Lỗi Repository (findAll): ${error.message}`);
    }
  }

  async findByEmail(email) {
    return await CandidateModel.find({ email })
      .populate("job", "title jobCode status deadline")
      .sort({ createdAt: -1 })
      .lean();
  }
}

export default new CandidateRepository();
