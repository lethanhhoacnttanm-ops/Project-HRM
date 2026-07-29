import bcrypt from 'bcryptjs';
import employeeRepository from '../repositories/employee.repository.js';
import authService from '../services/auth.service.js';

export const seedAdminAccount = async () => {
  try {
    const adminExists = await employeeRepository.findByRole('ADMIN');

    if (adminExists) {
      console.log('[SEED] Tài khoản Admin đã tồn tại. Bỏ qua bước seed.');
      return;
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.warn('[SEED] Thiếu ADMIN_EMAIL hoặc ADMIN_PASSWORD trong file .env');
      return;
    }

    await authService.createAdminAccount({
      fullName: 'Super Admin',
      email: adminEmail,
      password: adminPassword,
    });


  } catch (error) {
    console.error('[SEED] Lỗi khi seed tài khoản Admin:', error.message);
  }
};