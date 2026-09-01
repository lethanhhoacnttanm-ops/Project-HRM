import authService from '../services/auth.service.js';
import { ENV } from '../env.js';
import AuditLogModel from '../models/AuditLog.js';

class AuthController {

//   await AuditLogModel.create({
//   userId: req.user.id,
//   userName: req.user.fullName || req.user.email,
//   action: 'Đổi mật khẩu',
//   status: 'Thành công',
//   device: req.headers['user-agent'] || 'Unknown',
//   ipAddress: req.ip || req.headers['x-forwarded-for'] || '127.0.0.1',
// });

// await AuditLogModel.create({
//   userId: req.user.id,
//   userName: req.user.fullName || req.user.email,
//   action: 'Chỉnh sửa thông tin cá nhân',
//   status: 'Thành công',
//   device: req.headers['user-agent'] || 'Unknown',
//   ipAddress: req.ip || req.headers['x-forwarded-for'] || '127.0.0.1',
// });

  async login(req, res) {
    try {
      const { employee, token } = await authService.loginEmployee(req.body);

      await AuditLogModel.create({
        userId: employee._id || employee.id,
        userName: employee.fullName || employee.email,
        action: 'Đăng nhập hệ thống',
        status: 'Thành công',
        device: req.headers['user-agent'] || 'Unknown',
        ipAddress: req.ip || req.headers['x-forwarded-for'] || '127.0.0.1',
        location: 'Ho Chi Minh City, VN',
      });
      const isProduction = ENV.NODE_ENV === 'production';


      res.cookie('token', token, {
        httpOnly: true,
        secure: isProduction, 
        sameSite: isProduction ? 'none' : 'lax', 
        maxAge: 24 * 60 * 60 * 1000, 
      });

      return res.status(200).json({
        success: true,
        message: 'Đăng nhập thành công!',
        data: employee,
      });
    } catch (error) {

      await AuditLogModel.create({
        userName: req.body.email || 'Ẩn danh',
        action: 'Đăng nhập hệ thống',
        status: 'Thất bại',
        device: req.headers['user-agent'] || 'Unknown',
        ipAddress: req.ip || req.headers['x-forwarded-for'] || '127.0.0.1',
      });

      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getMe(req, res) {
    try {
      const employee = await authService.getCurrentEmployee(req.user.id);
      return res.status(200).json({
        success: true,
        data: employee,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
  
  async logout(req, res) {
    try {
      if (req.user) {
        await AuditLogModel.create({
          userId: req.user.id,
          userName: req.user.fullName || req.user.email || 'Nhân viên',
          action: 'Đăng xuất hệ thống',
          status: 'Thành công',
          device: req.headers['user-agent'] || 'Unknown',
          ipAddress: req.ip || req.headers['x-forwarded-for'] || '127.0.0.1',
        });
      }
    } catch (err) {
      console.error('Lỗi ghi log đăng xuất:', err);
    }

    res.clearCookie('token');
    return res.status(200).json({
      success: true,
      message: 'Đăng xuất thành công!',
    });
  }
}

export default new AuthController();