import { body, validationResult } from 'express-validator';

export const validateRegisterRules = [
  body('fullName').notEmpty().withMessage('Họ và tên là bắt buộc!'),
  body('email').isEmail().withMessage('Email không đúng định dạng!'),
  body('dateOfBirth').notEmpty().withMessage('Ngày sinh là bắt buộc!'),
  body('identityCard').notEmpty().withMessage('Số CCCD/CMND là bắt buộc!'),
  body('password').isLength({ min: 6 }).withMessage('Mật khẩu phải có ít nhất 6 ký tự!'),
  body('confirmPassword').notEmpty().withMessage('Vui lòng xác nhận mật khẩu!'),
];

export const handleValidationRegister = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((err) => err.msg),
    });
  }
  next();
};