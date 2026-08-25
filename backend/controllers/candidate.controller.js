import CandidateModel from '../models/Candidate.js';
import JobModel from '../models/Job.js';
import candidateService from '../services/candidate.service.js';

class CandidateController {
    async applyJob(req, res, next) {
        try {
            const candidateData = req.body;

            const newCandidate = await candidateService.createCandidateApplication(candidateData);

            return res.status(201).json({
                success: true,
                message: 'Nộp hồ sơ ứng tuyển thành công!',
                data: newCandidate
            });
        } catch (error) {
            const statusCode = error.statusCode || 500;
            return res.status(statusCode).json({
                success: false,
                message: error.message || 'Lỗi server nội bộ'
            });
        }
    }

    async getCandidatesByJob(req, res, next) {
        try {
            const { jobId } = req.params;

            const candidates = await candidateService.getCandidatesByJobId(jobId);

            return res.status(200).json({
                success: true,
                message: 'Lấy danh sách ứng viên theo dự án thành công',
                data: candidates
            });
        } catch (error) {
            const statusCode = error.statusCode || 500;
            return res.status(statusCode).json({
                success: false,
                message: error.message || 'Lỗi server nội bộ'
            });
        }
    }
}

export default new CandidateController();