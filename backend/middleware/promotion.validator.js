import { body, validationResult } from 'express-validator';
import PromotionModel from '../models/Promotion.js';

export const validateCreatePromotion = [
    body('employeeId').isMongoId().withMessage('ID nhân viên không hợp lệ!'),
    body('currentDepartment').notEmpty().withMessage('Phòng ban hiện tại không được để trống!'), // Đã bỏ phần .not().isUndefined() bị lỗi
    body('currentPosition').notEmpty().withMessage('Vị trí hiện tại không được để trống!'),
    body('currentLevel').notEmpty().withMessage('Cấp bậc hiện tại không được để trống!'),
    body('proposedLevel').notEmpty().withMessage('Cấp bậc đề xuất không được để trống!'),
    body('effectiveDate').isISO8601().toDate().withMessage('Ngày có hiệu lực không hợp lệ!'),
];

export const handleValidationPromotion = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
};

export const validationValueUpdatedPromotion = [
  body('status')
    .notEmpty()
    .withMessage("Trường 'status' không được để trống!")
    .isIn(['PENDING_REVIEW', 'APPROVED_PENDING_EFFECTIVE', 'WAITING', 'COMPLETED','REJECTED'])
    .withMessage("Trạng thái không hợp lệ! Các giá trị cho phép: PENDING_REVIEW, APPROVED_PENDING_EFFECTIVE, WAITING, COMPLETED"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Dữ liệu gửi lên không hợp lệ!",
        errors: errors.array(), 
      });
    }
    next();
  },
];

export const handlelogicUpdated = async (req, res, next) => {
  try {
    const { id } = req.params;
    const promotion = await PromotionModel.findById(id);

    if (!promotion) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy đơn đề xuất thăng tiến để thực hiện cập nhật!",
      });
    }

    if (promotion.status === 'COMPLETED') {
      return res.status(400).json({
        success: false,
        message: "Đơn đề xuất này đã hoàn tất (COMPLETED), không thể thay đổi trạng thái!",
      });
    }

    req.currentPromotion = promotion;

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Lỗi kiểm tra logic nghiệp vụ!",
    });
  }
};