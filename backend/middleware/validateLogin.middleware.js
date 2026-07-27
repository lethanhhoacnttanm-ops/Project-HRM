import { body, validationResult } from 'express-validator';

export const validateLoginRules = [
  body('email').isEmail().withMessage('Email không đúng định dạng!'),
  body('password').notEmpty().withMessage('Vui lòng nhập mật khẩu!'),
];

export const handleValidationLogin = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((err) => err.msg),
    });
  }
  next();
};