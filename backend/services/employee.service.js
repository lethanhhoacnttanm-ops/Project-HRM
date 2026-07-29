import employeeRepository from '../repositories/employee.repository.js';

class EmployeeService {

    async getAllEmployee() {
        const employee = await employeeRepository.findAllEmpoyees()

        if (!employee) {
            throw new Error('Danh sách rỗng hoàn toàn !!');
        }

        return employee
    }
}

export default new EmployeeService();