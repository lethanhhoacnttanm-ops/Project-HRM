import AuditLogModel from '../models/AuditLog.js';

class SecurityRepository {
  async findLatestLogs() {
    return await AuditLogModel.find()
      .sort({ createdAt: -1 })
      .limit(50);
  }
}

export default new SecurityRepository();