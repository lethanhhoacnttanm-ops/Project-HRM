import CandidateModel from '../models/Candidate.js';
import JobModel from '../models/Job.js';
import candidateService from '../services/candidate.service.js';

class CandidateController {
  async applyJob(req, res) {
    try {
      const { jobId, appliedPosition } = req.body;
      const employeeInfo = req.user;

      const result = await candidateService.createApplication({
        employeeInfo,
        jobId,
        appliedPosition,
      });

      return res.status(201).json({
        success: true,
        message: 'Ứng tuyển vị trí thành công!',
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message || 'Lỗi khi ứng tuyển công việc!',
      });
    }
  }

  async updateStage(req, res) {
    try {
      const { id } = req.params;
      const { stage } = req.body;

      if (!stage) {
        return res.status(400).json({ success: false, message: 'Trường stage không được để trống!' });
      }

      const updated = await candidateService.updateCandidateStage(id, stage);

      return res.status(200).json({
        success: true,
        message: 'Chuyển bước ứng viên thành công!',
        data: updated,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Lỗi máy chủ khi cập nhật bước ứng viên!',
        error: error.message,
      });
    }
  }

  async getCandidatesByJob(req, res) {
    try {
      const jobId = req.params.jobId || req.query.jobId;

      const result = await candidateService.fetchCandidates({ jobId });

      return res.status(200).json({
        success: true,
        message: 'Lấy danh sách ứng viên thành công!',
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Lỗi máy chủ khi lấy danh sách ứng viên!',
        error: error.message,
      });
    }
  }

  async getAllCandidatesNoPagination(req, res) {
    try {
      const candidates = await candidateService.getAllCandidatesWithoutPagination();

      return res.status(200).json({
        success: true,
        message: 'Lấy toàn bộ danh sách ứng viên thành công!',
        dataCandidates: candidates,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Lỗi máy chủ khi lấy dữ liệu thống kê ứng viên!',
        error: error.message,
      });
    }
  }
}

export default new CandidateController();