import bcrypt from 'bcryptjs';
import employeeRepository from '../repositories/employee.repository.js';
import { generateAdminCode } from '../utils/generateAdminCode.js'
import { generateToken } from '../utils/jwt.js';
import { body } from 'express-validator';

class AuthService {

  async loginEmployee({ email, password }) {
    const employee = await employeeRepository.findByEmailWithPassword(email);
    if (!employee) {
      throw new Error('Email hoặc mật khẩu không chính xác!');
    }

    if (employee.status !== 'active') {
      throw new Error('Tài khoản của bạn đã bị khóa hoặc ngừng hoạt động!');
    }

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      throw new Error('Email hoặc mật khẩu không chính xác!');
    }

    const token = generateToken({ id: employee._id, role: employee.role });

    const employeeObject = employee.toObject();
    delete employeeObject.password;

    return { employee: employeeObject, token };
  }

  async getCurrentEmployee(userId) {
    const employee = await employeeRepository.findById(userId);
    if (!employee) {
      throw new Error('Không tìm thấy thông tin người dùng!');
    }
    return employee;
  }


  async createAdminAccount(adminData) {
    const { fullName, email, password } = adminData;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const generatedCode = generateAdminCode();

    const newAdminPayload = {
      fullName: fullName || 'Super Admin',
      email,
      code: generatedCode,
      password: hashedPassword, 
      status: "active",
      identityCard: process.env.ADMIN_IDENTITY,
      role: 'ADMIN',
    };

    return await employeeRepository.create(newAdminPayload);
  }
}

export default new AuthService();