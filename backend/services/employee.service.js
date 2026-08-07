import employeeRepository from '../repositories/employee.repository.js';

class EmployeeService {
    async getAllEmployee({ page, limit, role }) {
        const pageNumber = Math.max(1, parseInt(page, 10));
        const pageSize = Math.max(1, parseInt(limit, 10));
        const skip = (pageNumber - 1) * pageSize;

        let queryFilter = {};
        if (role) {
            queryFilter.role = role;
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
}

export default new EmployeeService();