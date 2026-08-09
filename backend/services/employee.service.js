import employeeRepository from '../repositories/employee.repository.js';
import bcrypt from 'bcryptjs';
import { dateUtils } from '../utils/date.js';

class EmployeeService {
    async getAllEmployee({ page, limit, role, status }) {
        const pageNumber = Math.max(1, parseInt(page, 10));
        const pageSize = Math.max(1, parseInt(limit, 10));
        const skip = (pageNumber - 1) * pageSize;

        let queryFilter = {};
        if (role) {
            queryFilter.role = role;
        }

        if (status) {
            queryFilter.status = status;
        }

        const { totalEmp, dataEmp } = await employeeRepository.FindWithPagination({
            skip,
            limit: pageSize,
            filter: queryFilter
        });


        if (totalEmp === undefined || dataEmp === undefined) {
            throw new Error("Error valid field in pagination");
        }

        return {
            dataEmp,
            pagination: {
                totalEmp,
                pageNumber,
                pageSize,
                totalPage: Math.ceil(totalEmp / pageSize)
            }
        };
    }

    async updateEmployeeInfo(id, payload) {
        const existingEmp = await employeeRepository.findById(id);
        if (!existingEmp) {
            throw new Error("Không tìm thấy nhân viên này!");
        }

        if (payload.dateOfBirth) {
            payload.dateOfBirth = dateUtils.formatDateOfBirth(payload.dateOfBirth);
        }

        const updatedData = await employeeRepository.updateEditFileById(id, payload);

        return updatedData;
    }

    // ===== EMP-Profile =====
    async getMyProfile(employeeId) {
        const employee = await employeeRepository.findById(employeeId);
        if (!employee) {
            throw new Error('Không tìm thấy thông tin nhân viên!');
        }
        return employee;
    }

    async updateMyProfile(employeeId, payload) {
        // Chỉ cho phép cập nhật các field an toàn
        const allowedFields = [
            'fullName',
            'phone',
            'gender',
            'dateOfBirth',
            'avatar',
        ];

        const updateData = {};
        allowedFields.forEach((field) => {
            if (payload[field] !== undefined) {
                updateData[field] = payload[field];
            }
        });

        if (Object.keys(updateData).length === 0) {
            throw new Error('Không có dữ liệu nào để cập nhật!');
        }

        const updated = await employeeRepository.updateById(employeeId, updateData);
        if (!updated) {
            throw new Error('Cập nhật hồ sơ thất bại!');
        }
        return updated;
    }

    async changePassword(employeeId, { currentPassword, newPassword }) {
        if (!currentPassword || !newPassword) {
            throw new Error('Vui lòng nhập đầy đủ mật khẩu hiện tại và mật khẩu mới!');
        }

        if (newPassword.length < 6) {
            throw new Error('Mật khẩu mới phải có ít nhất 6 ký tự!');
        }

        const employee = await employeeRepository.findByIdWithPassword(employeeId);
        if (!employee) {
            throw new Error('Không tìm thấy tài khoản!');
        }

        const isMatch = await bcrypt.compare(currentPassword, employee.password);
        if (!isMatch) {
            throw new Error('Mật khẩu hiện tại không đúng!');
        }

        const hashed = await bcrypt.hash(newPassword, 10);
        await employeeRepository.updateById(employeeId, { password: hashed });

        return true;
    }
}

export default new EmployeeService();