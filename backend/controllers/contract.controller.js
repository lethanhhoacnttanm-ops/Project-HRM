import contractService from "../services/contract.service.js";

class ContractsController {
  async postNewContract(req, res) {
    try {
      const payload = req.body;
      const result = await contractService.postNewContractEmployee(payload);
      return res.status(200).json({
        success: result.success || true,
        message: result.message || 'Tạo hợp đồng thành công!',
        dataContract: result.data
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Lỗi máy chủ khi tạo hợp đồng!',
        error: error.message,
      });
    }
  };
}

export default new ContractsController();