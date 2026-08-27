import internalJobService from '../services/internalJob.service.js';

class InternalJobController {
  async getOpenJobs(req, res) {
    try {
      const data = await internalJobService.getOpenJobs();
      return res.status(200).json({
        success: true,
        message: 'Lấy danh sách việc làm nội bộ thành công!',
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Lỗi khi lấy danh sách job!',
      });
    }
  }

  async getJobDetail(req, res) {
    try {
      const data = await internalJobService.getJobDetail(req.params.id);
      return res.status(200).json({ success: true, data });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  async apply(req, res) {
    try {
      const data = await internalJobService.applyToJob(req.user.id, req.body);
      return res.status(201).json({
        success: true,
        message: 'Nộp đơn ứng tuyển thành công!',
        data,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getMyApplications(req, res) {
    try {
      const data = await internalJobService.getMyApplications(req.user.id);
      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new InternalJobController();