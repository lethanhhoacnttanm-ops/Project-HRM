import jobService from "../services/job.service.js";

class JobsController {
    async createJob(req, res) {
        try {
            const adminId = req.user._id;

            const newJob = await jobService.createJob(req.body, adminId);

            return res.status(201).json({
                success: true,
                message: 'Tạo bài đăng công việc thành công !',
                data: newJob,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message || 'Lỗi hệ thống khi tạo bài đăng công việc!',
            });
        }
    };

    async getAllJobs(req, res) {
        try {
            const { page, limit } = req.query;
            const result = await jobService.getAllJobs({ page, limit });
            return res.status(200).json({
                success: true,
                message: 'Lấy danh sách những bài đăng thành công!',
                dataJobs: result.dataJobs || result,
                pagination: result.pagination || {}
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Lỗi máy chủ khi lấy danh sách  những bài đăng!',
                error: error.message,
            });
        }
    };

    async getJobForApproval(req, res, next) {
        try {
            const { id } = req.params;
            const jobData = await jobService.getJobDetailsAndStats(id);

            return res.status(200).json({
                success: true,
                message: 'Lấy thông tin job thành công',
                data: jobData
            });
        } catch (error) {
            const statusCode = error.statusCode || 500;
            return res.status(statusCode).json({
                success: false,
                message: error.message || 'Lỗi server nội bộ'
            });
        }
    }

    async getJobForApproval(req, res, next) {
        try {
            const { id } = req.params;

            const result = await jobService.getJobDetailsAndCandidates(id);

            return res.status(200).json({
                success: true,
                message: 'Lấy thông tin dự án và danh sách ứng viên thành công',
                data: result 
            });
        } catch (error) {
            const statusCode = error.statusCode || 500;
            return res.status(statusCode).json({
                success: false,
                message: error.message || 'Lỗi server nội bộ'
            });
        }
    }

    //     async updateStatus(req, res) {
    //     try {
    //       const { id } = req.params; 
    //       const payload = req.body; 

    //       const result = await promotionService.updatePromotionStatus(id, payload);

    //       return res.status(200).json({
    //         success: true,
    //         message: "Đã di chuyển qua kiểm tra",
    //         data: result
    //       });
    //     } catch (error) {
    //       return res.status(500).json({
    //         success: false,
    //         message: error.message || "Lỗi máy chủ khi cập nhật trạng thái đề xuất!",
    //       });
    //     }
    //   }
}

export default new JobsController();
