import bcrypt from 'bcryptjs';
import employeeRepository from '../repositories/employee.repository.js';
import { generateEmployeeCode } from '../utils/generateEmployeeCode.js';
import { generateToken } from '../utils/jwt.js';

class AuthService {
  async registerEmployee(registerData) {
    const { fullName, email, dateOfBirth, identityCard, password, confirmPassword } = registerData;

    if (password !== confirmPassword) {
      throw new Error('Mật khẩu xác nhận không trùng khớp!');
    }

    const existingEmail = await employeeRepository.findByEmail(email);
    if (existingEmail) {
      throw new Error('Email này đã tồn tại trong hệ thống!');
    }

    const existingIdentity = await employeeRepository.findByIdentityCard(identityCard);
    if (existingIdentity) {
      throw new Error('Số CCCD/CMND này đã được sử dụng!');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const employeeCode = generateEmployeeCode();

    const newEmployee = await employeeRepository.create({
      employeeCode,
      fullName,
      email,
      dateOfBirth,
      identityCard,
      password: hashedPassword,
    });

    const token = generateToken({ id: newEmployee._id, role: newEmployee.role });

    return { employee: newEmployee, token };
  }
}

export default new AuthService();