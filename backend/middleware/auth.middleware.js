import jwt from 'jsonwebtoken';
import { ENV } from '../env.js';
import EmployeeModel from '../models/Employee.js';

export const verifyToken = async (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Bạn chưa đăng nhập! Vui lòng đăng nhập để tiếp tục.',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decoded.id || decoded._id;

    const user = await EmployeeModel.findById(userId);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Tài khoản không tồn tại trong hệ thống!',
      });
    }

    req.user = user; 
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: 'Token không hợp lệ hoặc đã hết hạn!',
    });
  }
};

export const checkRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Bạn không có quyền thực hiện thao tác này!',
      });
    }
    next();
  };
};