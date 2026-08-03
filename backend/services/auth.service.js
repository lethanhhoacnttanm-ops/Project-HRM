import bcrypt from 'bcryptjs';
import employeeRepository from '../repositories/employee.repository.js';
import { generateEmployeeCode } from '../utils/generateEmployeeCode.js';
import { generateAdminCode } from '../utils/generateAdminCode.js'
import { generateToken } from '../utils/jwt.js';

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

  async registerEmployee(registerData) {
    const { fullName, email, dateOfBirth, identityCard, password, confirmPassword, phone, gender } = registerData;

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

    const code = generateEmployeeCode();

    const newEmployee = await employeeRepository.create({
      code,
      fullName,
      email,
      dateOfBirth,
      identityCard,
      phone,
      gender,
      password: hashedPassword,
      role: 'EMPLOYEE',
      status: 'active',
    });

    const token = generateToken({ id: newEmployee._id, role: newEmployee.role });

    const employeeResponse = newEmployee.toObject ? newEmployee.toObject() : { ...newEmployee };
    delete employeeResponse.password;

    return { employee: employeeResponse, token };
  }

  async createAdminAccount(adminData) {
    const { fullName, email, password } = adminData;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const employeeCode = generateAdminCode();

    const newAdminPayload = {
      fullName: fullName || 'Super Admin',
      email,
      employeeCode,
      password: hashedPassword,
      identityCard: process.env.ADMIN_IDENTITY,
      role: 'ADMIN',
    };

    return await employeeRepository.create(newAdminPayload);
  }
}

export default new AuthService();