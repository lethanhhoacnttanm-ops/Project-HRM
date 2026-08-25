import jobsRepository from '../repositories/jobs.repository.js';
import candidateRepository from '../repositories/candidate.repository.js';
import { calculateGradeTenure, formatDate } from '../utils/date.js';
import { formatVND, parseNumber } from '../utils/formatters.js';


class JobsService {
    async getAllJobs({ page, limit }) {
        const pageNumber = Math.max(1, parseInt(page, 6));
        const pageSize = Math.max(1, parseInt(limit, 6));
        const skip = (pageNumber - 1) * pageSize;

        const { totalJobs, dataJobs } = await jobsRepository.FindWithPagination({
            skip,
            limit: pageSize,
        });


        if (totalJobs === undefined || dataJobs === undefined) {
            throw new Error("Lỗi trường hợp lệ trong phân trang");
        }

        return {
            dataJobs,
            pagination: {
                totalJobs,
                pageNumber,
                pageSize,
                totalPage: Math.ceil(totalJobs / pageSize)
            }
        };
    }

    async createJob(data, adminId) {
        const {
            title,
            client,
            budget,
            deadline,
            priority,
            description,
            positions,
            techStack,
            requirements,
        } = data;

        const randomCode = Math.floor(1000 + Math.random() * 9000);
        const jobCode = `JOB-${Date.now().toString().slice(-6)}-${randomCode}`;

        let formattedRequirements = [];
        if (requirements) {
            if (Array.isArray(requirements)) {
                formattedRequirements = requirements;
            } else if (typeof requirements === 'string') {
                formattedRequirements = requirements
                    .split('\n')
                    .map((item) => item.trim())
                    .filter((item) => item !== '');
            }
        }

        let formattedTechStack = [];
        if (techStack) {
            if (Array.isArray(techStack)) {
                formattedTechStack = techStack;
            } else if (typeof techStack === 'string') {
                formattedTechStack = techStack
                    .split(',')
                    .map((tech) => tech.trim())
                    .filter((tech) => tech !== '');
            }
        }


        let finalBudget = budget;
        if (budget && typeof budget === 'string' && !isNaN(parseNumber(budget))) {
            finalBudget = formatVND(parseNumber(budget));
        }

        const jobPayload = {
            jobCode,
            title: title.trim(),
            client: client ? client.trim() : '',
            budget: finalBudget || '0',
            deadline: deadline ? new Date(deadline) : null,
            priority: priority || 'Trung bình',
            positions: positions || [],
            techStack: formattedTechStack,
            description: description ? description.trim() : '',
            requirements: formattedRequirements,
            status: 'active',
            createdBy: adminId || null,
        };

        const savedJob = await jobsRepository.createJobPosting(jobPayload);

        return savedJob;
    }

    async getJobDetailsAndStats(jobId, adminId) {
        if (!jobId || !jobId.match(/^[0-9a-fA-F]{24}$/)) {
            const error = new Error('ID công việc không hợp lệ');
            error.statusCode = 400;
            throw error;
        }

        const job = await jobsRepository.findById(jobId);

        if (!job) {
            const error = new Error('Không tìm thấy công việc này');
            error.statusCode = 404;
            throw error;
        }

        return job.toObject ? job.toObject() : job;
    }

    async getJobDetailsAndCandidates(jobId) {
        if (!jobId || !jobId.match(/^[0-9a-fA-F]{24}$/)) {
            const error = new Error('ID công việc không hợp lệ');
            error.statusCode = 400;
            throw error;
        }

        const job = await jobsRepository.findById(jobId);
        if (!job) {
            const error = new Error('Không tìm thấy công việc này');
            error.statusCode = 404;
            throw error;
        }

        const candidates = await candidateRepository.findByJobId(jobId);

        return {
            jobInfo: job,
            candidates: candidates
        };
    }


    //   async updatePromotionStatus(promotionId, payload) {
    //     const { status } = payload;

    //     const promotion = await promotionRepository.findById(promotionId);
    //     if (!promotion) {
    //       throw new Error("Không tìm thấy đơn đề xuất thăng tiến!");
    //     }

    //     let updateData = { status };

    //     if (status === 'COMPLETED') {
    //       updateData.effectiveDate = new Date();

    //       await employeeRepository.updateEmployeeLevel(
    //         promotion.employeeId, 
    //         promotion.proposedLevel
    //       );
    //     }

    //     const updatedPromotion = await promotionRepository.updateStatus(promotionId, updateData);

    //     return {
    //       success: true,
    //       message: "Cập nhật trạng thái đề xuất thành công",
    //       data: updatedPromotion,
    //     };
    //   }
}

export default new JobsService()