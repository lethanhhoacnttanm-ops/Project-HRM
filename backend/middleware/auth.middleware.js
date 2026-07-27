import jwt from 'jsonwebtoken';
import { ENV } from '../env.js';

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Bạn chưa đăng nhập hoặc phiên làm việc đã hết hạn!',
      });
    }

    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token không hợp lệ hoặc đã hết hạn!',
    });
  }
};