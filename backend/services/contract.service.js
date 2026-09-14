import contractRepository from "../repositories/contract.repository.js";
import { contractUtils } from "../utils/contract.util.js";
import { generateUniqueEmployeeCode } from "../utils/generateEmployeeCode.js";
import EmployeeModel from "../models/Employee.js";
import ContractModel from "../models/Contract.js";

class ContractsService {
  async postNewContractEmployee(payload) {
    if (!payload.employee) {
      throw new Error("Thiếu ID nhân viên để tạo hợp đồng");
    }

    const newContractCode = contractUtils.generateContractCode();

    const formattedSalary = contractUtils.formatVND(payload.salary || 0);
    console.log(`Đang tạo hợp đồng lương: ${formattedSalary}`);

    const contractDataToSave = {
      ...payload,
      contractCode: newContractCode,
    };

    const code = await generateUniqueEmployeeCode()
    console.log("Mã nhân viên mới sinh ra không trùng lặp:", code);

    const newContract = await contractRepository.create(contractDataToSave);

    const updatedEmployee = await contractRepository.updateEmployeeStatus(
      payload.employee,
      "active",
      "EMPLOYEE",
      code
    );

    console.log("Nhân viên sau khi update:", updatedEmployee);

    return {
      success: true,
      message: "Tạo hợp đồng thành công",
      data: newContract,
    };
  }

  async getAllContractByID({ page, limit }) {
    const pageNumber = Math.max(1, parseInt(page, 10));
    const pageSize = Math.max(1, parseInt(limit, 10));
    const skip = (pageNumber - 1) * pageSize;

    const { dataContract, totalContract } = await contractRepository.findAll({
      skip,
      limit: pageSize,
    });

    if (totalContract === undefined || dataContract === undefined) {
      throw new Error("Lỗi trường hợp lệ trong phân trang");
    }

    return {
      dataContract,
      pagination: {
        totalContract,
        pageNumber,
        pageSize,
        totalPage: Math.ceil(totalContract / pageSize)
      },
    };
  }

  async getListContracts() {
    const contracts = await contractRepository.getListContract();
    return contracts;
  }

  async getMyContracts(employeeId) {
    const contracts = await contractRepository.findByEmployeeId(employeeId);
    return contracts;
  }

  async getContractCount() {
    const count = await contractRepository.countContracts();
    return { total: count };
  }

  async getContractTypeStatistics() {
    const contracts = await ContractModel.find();

    const stats = {
      fulltime: 0,
      parttime: 0,
      probation: 0,
      other: 0
    };

    contracts.forEach(c => {
      if (c.type === 'Fulltime') {
        stats.fulltime++;
      } else if (c.type === 'Parttime') {
        stats.parttime++;
      } else if (c.type === 'Probation') {
        stats.probation++;
      } else {
        stats.other++;
      }
    });

    return {
      totalContracts: contracts.length,
      breakdown: {
        fulltime: stats.fulltime,
        parttime: stats.parttime,
        probation: stats.probation,
        other: stats.other
      }
    };
  }

  async getPendingContractsForNewEmployees() {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const startOfMonth = new Date(currentYear, currentMonth, 1);
    const endOfMonth = new Date(currentYear, currentMonth + 1, 0, 23, 59, 59);

    const newEmployees = await EmployeeModel.find({
      createdAt: { $gte: startOfMonth, $lte: endOfMonth }
    });

    const allContracts = await ContractModel.find();
    const employeeIdsWithContract = new Set(allContracts.map(c => c.employeeId?.toString()));

    const pendingList = newEmployees.filter(emp => !employeeIdsWithContract.has(emp._id.toString()));

    return {
      newEmployeesThisMonthCount: newEmployees.length,
      pendingCount: pendingList.length,
      pendingEmployees: pendingList
    };
  }
}

export default new ContractsService();