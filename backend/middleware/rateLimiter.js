import {rateLimit} from 'express-rate-limit'

export const globalLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, 
  max: 100, 
  handler: (req, res) => {
    res.status(429).json({
      status: 'Thất bại',
      error: 'Quá nhiều yêu cầu gửi đến server',
      message: 'Bạn đã gửi yêu cầu quá nhiểu !! Hãy thao tác trong 15 phút'
    });
  }
});

export const authLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 5, 
  message: {
    status: 'Thất bại',
    message: 'Bạn đã thử thao tác quá nhiều lần. Vui lòng chờ 1 phút.'
  }
});

// export const uploadLimiter = rateLimit({
//   windowMs: 1 * 60 * 1000, 
//   max: 3,
//   message: {
//     status: 'fail',
//     message: 'You are uploading too quickly. Please wait 1 minute to continue.'
//   }
// });
