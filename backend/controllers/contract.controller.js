import contractService from "../services/contract.service.js";

class ContractsController {
  async postNewContract(req, res) {
    try {
      const payload = req.body;
      const result = await contractService.postNewContractEmployee(payload);
      return res.status(200).json({
        success: result.success || true,
        message: result.message || "Tạo hợp đồng thành công!",
        dataContract: result.data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Lỗi máy chủ khi tạo hợp đồng!",
        error: error.message,
      });
    }
  }

  async getAllContractForTable(req, res) {
    try {
      const { page, limit } = req.query;
      const result = await contractService.getAllContractByID({ page, limit });

      return res.status(200).json({
        success: result.success || true,
        message: result.message || "Hoàn thành lấy toàn bộ dữ liệu!",
        dataContract: result.dataContract,
        pagination: result.pagination || {},
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Thất bại khi lấy dữ liệu!",
        error: error.message,
      });
    }
  }
  async getMyContracts(req, res) {
    try {
      const contracts = await contractService.getMyContracts(req.user.id);
      return res.status(200).json({
        success: true,
        message: "Lấy hợp đồng của bạn thành công!",
        data: contracts,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Lỗi khi lấy hợp đồng!",
      });
    }
  }
}

export default new ContractsController();
