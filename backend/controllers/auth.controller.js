import authService from '../services/auth.service.js';
import { ENV } from '../env.js';

class AuthController {
  async register(req, res) {
    try {
      const { employee, token } = await authService.registerEmployee(req.body);

      res.cookie('token', token, {
        httpOnly: true, 
        secure: ENV.NODE_ENV === 'production', 
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000, 
      });

     
      return res.status(201).json({
        success: true,
        message: 'Đăng ký tài khoản nhân viên thành công!',
        data: {
          id: employee._id,
          employeeCode: employee.employeeCode,
          fullName: employee.fullName,
          email: employee.email,
          role: employee.role,
        },
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new AuthController();