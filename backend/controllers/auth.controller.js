import authService from '../services/auth.service.js';
import { ENV } from '../env.js';

class AuthController {

  async login(req, res) {
    try {
      const { employee, token } = await authService.loginEmployee(req.body);

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
    res.clearCookie('token');
    return res.status(200).json({
      success: true,
      message: 'Đăng xuất thành công!',
    });
  }
}

export default new AuthController();