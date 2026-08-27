import promotionRepository from "../repositories/promotion.repository.js";
import employeeRepository from "../repositories/employee.repository.js";
import { calculateGradeTenure, formatDate } from "../utils/date.js";

class PromotionService {
  async getAllPromotion({ page, limit, status }) {
    const pageNumber = Math.max(1, parseInt(page, 10));
    const pageSize = Math.max(1, parseInt(limit, 10));
    const skip = (pageNumber - 1) * pageSize;

    const { totalPromotion, dataPromotion } =
      await promotionRepository.FindWithPagination({
        skip,
        limit: pageSize,
        status,
      });

    if (totalPromotion === undefined || dataPromotion === undefined) {
      throw new Error("Lỗi trường hợp lệ trong phân trang");
    }

    return {
      dataPromotion,
      pagination: {
        totalPromotion,
        pageNumber,
        pageSize,
        totalPage: Math.ceil(totalPromotion / pageSize),
      },
    };
  }

  async createPromotion(data, adminId) {
    const {
      employeeId,
      currentDepartment,
      currentPosition,
      currentLevel,
      proposedLevel,
      promotionType,
      effectiveDate,
    } = data;

    const employee = await employeeRepository.findById(employeeId);
    if (!employee) {
      throw new Error("Không tìm thấy thông tin nhân viên trong hệ thống!");
    }

    let tenure = 0;
    if (employee.timeinrole) {
      tenure = calculateGradeTenure(employee.timeinrole, new Date());
    }

    const normalizedEffectiveDate = formatDate(effectiveDate);

    const promotionPayload = {
      employeeId: employee._id,
      avatarUrl: employee.avatarUrl || "",
      nameEmployee: employee.fullName,
      emailEmployee: employee.email,
      currentDepartment,
      currentPosition,
      currentLevel,
      proposedLevel,
      performanceRating: employee.performanceRating || 0,
      status: "PENDING_REVIEW",
      promotionType: promotionType || "Vertical",
      gradetenure: tenure,
      approvedBy: null,
      effectiveDate: normalizedEffectiveDate,
    };

    const savedPromotion =
      await promotionRepository.createPromotion(promotionPayload);

    return savedPromotion;
  }

  async updatePromotionStatus(promotionId, payload) {
    const { status } = payload;

    const promotion = await promotionRepository.findById(promotionId);
    if (!promotion) {
      throw new Error("Không tìm thấy đơn đề xuất thăng tiến!");
    }

    let updateData = { status };

    if (status === "COMPLETED") {
      updateData.effectiveDate = new Date();

      await employeeRepository.updateEmployeeLevel(
        promotion.employeeId,
        promotion.proposedLevel,
      );
    }

    const updatedPromotion = await promotionRepository.updateStatus(
      promotionId,
      updateData,
    );

    return {
      success: true,
      message: "Cập nhật trạng thái đề xuất thành công",
      data: updatedPromotion,
    };
  }

  async getMyPromotions(employeeId) {
    return await promotionRepository.findByEmployeeId(employeeId);
  }
}

export default new PromotionService();
