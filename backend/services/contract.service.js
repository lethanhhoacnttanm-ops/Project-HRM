import contractRepository from "../repositories/contract.repository.js";
import { contractUtils } from "../utils/contract.util.js";
import { generateUniqueEmployeeCode } from "../utils/generateEmployeeCode.js";

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

  async getAllContractByID({ page = 1, limit = 10 }) {
    const pageNumber = Math.max(1, parseInt(page, 10) || 1);
    const pageSize = Math.max(1, parseInt(limit, 10) || 10);

    const result = await contractRepository.findAll({
      page: pageNumber,
      limit: pageSize,
    });

    return {
      success: true,
      message: "Lấy toàn bộ danh sách hợp đồng thành công",
      data: result.data,
      pagination: result.pagination,
    };
  }

  async getMyContracts(employeeId) {
    const contracts = await contractRepository.findByEmployeeId(employeeId);
    return contracts;
  }
}

export default new ContractsService();