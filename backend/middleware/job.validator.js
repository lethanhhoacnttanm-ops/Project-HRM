import { body, validationResult } from 'express-validator';

export const handleValidationJob = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Dữ liệu đầu vào không hợp lệ!',
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
};

export const validateCreateJob = [
  body('title')
    .notEmpty().withMessage('Tên dự án không được để trống!')
    .isString().withMessage('Tên dự án phải là chuỗi ký tự!')
    .trim(),

  body('budget')
    .notEmpty().withMessage('Chi phí / Ngân sách dự án không được để trống!')
    .trim(),

  body('deadline')
    .notEmpty().withMessage('Deadline không được để trống!')
    .isISO8601().withMessage('Deadline phải là định dạng ngày hợp lệ (YYYY-MM-DD)!'),

  body('priority')
    .optional()
    .isIn(['Thấp', 'Trung bình', 'Cao', 'Khẩn cấp'])
    .withMessage('Mức độ ưu tiên không hợp lệ!'),

  body('positions')
    .isArray({ min: 1 }).withMessage('Phải có ít nhất một vị trí định biên cho dự án!'),

  body('positions.*.role')
    .notEmpty().withMessage('Vai trò của vị trí không được để trống!'),

  body('positions.*.level')
    .notEmpty().withMessage('Cấp bậc của vị trí không được để trống!')
    .isIn(['Fresher', 'Junior', 'Middle', 'Senior', 'Lead'])
    .withMessage('Cấp bậc không hợp lệ!'),

  body('positions.*.slots')
    .notEmpty().withMessage('Số lượng slot không được để trống!')
    .isInt({ min: 1 }).withMessage('Số lượng slot phải là số nguyên lớn hơn hoặc bằng 1!'),
];