import contractRepository from "../repositories/contract.repository.js";
import { contractUtils } from "../utils/contract.util.js";

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

    const newContract =
      await contractRepository.createNewContract(contractDataToSave);

    await contractRepository.updateEmployeeStatus(
      payload.employee,
      "active",
      "EMPLOYEE",
    );

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

    const { totalContract, dataContract } =
      await contractRepository.getAllContract({ skip, limit: pageSize });

    if (totalContract === undefined || dataContract === undefined) {
      throw new Error("Lỗi trường hợp lệ trong phân trang");
    }

    return {
      success: true,
      message: "Lấy toàn bộ danh sách hợp đồng thành công",
      data: dataContract,
      pagination: {
        totalContract,
        pageNumber,
        pageSize,
        totalPage: Math.ceil(totalContract / pageSize),
      },
    };
  }
  async getMyContracts(employeeId) {
    const contracts = await contractRepository.findByEmployeeId(employeeId);
    return contracts;
  }
}

export default new ContractsService();
