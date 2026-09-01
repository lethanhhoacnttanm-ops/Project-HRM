import securityService from '../services/security.service.js';

class SecurityController {
  async getAuditLogs(req, res) {
    try {
      const logs = await securityService.getAuditLogs();
      return res.status(200).json({
        success: true,
        data: logs,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new SecurityController();