import JobModel from "../models/Job.js";

class JobsRepository {
  async createJobPosting(jobsData) {
    if (!JobModel) {
      throw new Error("JobModel bị undefined! Kiểm tra lại file models/Job.js");
    }
    const job = new JobModel(jobsData);
    return await job.save();
  }

  async FindWithPagination({ skip, limit }) {

    const [totalJobs, dataJobs] = await Promise.all([
      JobModel.countDocuments(),
      JobModel.find().skip(skip).limit(limit).lean()
    ]);

    return { totalJobs, dataJobs };
  }

  async findById(id) {
    return await JobModel.findById(id); 
  }

    async findActiveJobs() {
    return await JobModel.find({ status: 'active' })
      .populate('department', 'name')
      .sort({ deadline: 1 })
      .lean();
  }

  async findActiveById(id) {
    return await JobModel.findOne({ _id: id, status: 'active' })
      .populate('department', 'name')
      .lean();
  }
}

export default new JobsRepository();