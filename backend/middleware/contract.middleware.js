import { body, validationResult } from 'express-validator';

export const validateCreateContract = [
  body('employee')
    .notEmpty().withMessage('Thiếu thông tin: ID nhân viên không được để trống.')
    .isMongoId().withMessage('ID nhân viên không hợp lệ (Sai định dạng MongoID).'),

  body('salary')
    .notEmpty().withMessage('Mức lương cơ bản không được để trống.')
    .isNumeric().withMessage('Mức lương phải là một con số.')
    .custom((value) => {
      if (value < 0) {
        throw new Error('Mức lương không được là số âm.');
      }
      return true; 
    }),

  body('startDate')
    .notEmpty().withMessage('Ngày bắt đầu hợp đồng không được để trống.')
    .isISO8601().withMessage('Ngày bắt đầu sai định dạng (Yêu cầu ISO8601).'),

  body('endDate')
    .optional({ checkFalsy: true }) 
    .isISO8601().withMessage('Ngày kết thúc sai định dạng.')
    .custom((endDate, { req }) => {
      const startDate = req.body.startDate;
      if (startDate && new Date(endDate) <= new Date(startDate)) {
        throw new Error('Logic lỗi: Ngày kết thúc phải lớn hơn ngày bắt đầu.');
      }
      return true;
    }),

  body('type')
    .notEmpty().withMessage('Loại hợp đồng không được để trống.')
    .isString().withMessage('Loại hợp đồng phải là chuỗi văn bản.')
];

export const checkValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Dữ liệu đầu vào không hợp lệ!',
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  
  next(); 
};