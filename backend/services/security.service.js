import securityRepository from '../repositories/security.repository.js';

class SecurityService {
  async getAuditLogs() {
    return await securityRepository.findLatestLogs();
  }
}

export default new SecurityService();