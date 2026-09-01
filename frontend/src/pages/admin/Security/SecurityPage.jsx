import { useState, useEffect } from 'react';
import { ShieldAlert } from 'lucide-react';
import { SecurityConfigCard } from '@/components/admin/Security/SecurityConfigCard';
import { SecurityLogTable } from '@/components/admin/Security/SecurityLogTable';

import { securityService } from '@/services/security.service';

import {toast} from 'sonner'

export default function SecurityManagementPage() {
  const [rateLimitConfig, setRateLimitConfig] = useState({
    isActive: true,
    maxRequests: 100,
  });

  const [corsConfig, setCorsConfig] = useState({
    domains: ['http://localhost:5173', 'https://project-hrm-zeta.vercel.app'],
    newDomain: '',
  });

  const [auditConfig, setAuditConfig] = useState({
    isActive: true,
  });

  const [logs, setLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingLogs, setLoadingLogs] = useState(false);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      setLoadingLogs(true);
      const response = await securityService.getAuditLogs();
      if (response.success) {
        setLogs(response.data);
      }
    } catch (error) {
      console.error('Lỗi tải nhật ký bảo mật:', error);
    } finally {
      setLoadingLogs(false);
    }
  };

  const handleConfigUpdate = (action, payload) => {
    if (action === 'toggleRateLimit') {
      setRateLimitConfig(prev => ({ ...prev, isActive: !prev.isActive }));
    }
    if (action === 'setMaxRequests') {
      setRateLimitConfig(prev => ({ ...prev, maxRequests: payload }));
    }
    if (action === 'saveRateLimit') {
      toast.success(`Đã lưu giới hạn Rate Limit: ${rateLimitConfig.maxRequests} requests/15p`);
    }

    if (action === 'setNewDomain') {
      setCorsConfig(prev => ({ ...prev, newDomain: payload }));
    }
    if (action === 'addDomain') {
      if (!corsConfig.newDomain.trim()) return;
      setCorsConfig(prev => ({
        ...prev,
        domains: [...prev.domains, prev.newDomain.trim()],
        newDomain: ''
      }));
    }
    if (action === 'removeDomain') {
      setCorsConfig(prev => ({
        ...prev,
        domains: prev.domains.filter(d => d !== payload)
      }));
    }

    if (action === 'toggleAudit') {
      setAuditConfig(prev => ({ ...prev, isActive: !prev.isActive }));
    }
  };

  const filteredLogs = logs.filter(log =>
    log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.ipAddress.includes(searchTerm) ||
    log.action.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 bg-slate-50/50 min-h-screen">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <ShieldAlert className="size-6 text-indigo-600" />
          Quản Lý Bảo Mật Hệ Thống
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Giám sát nhật ký hoạt động thời gian thực và cấu hình các lớp phòng thủ toàn hệ thống.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SecurityConfigCard type="ratelimit" data={rateLimitConfig} onUpdate={handleConfigUpdate} />
        <SecurityConfigCard type="cors" data={corsConfig} onUpdate={handleConfigUpdate} />
        <SecurityConfigCard type="audit" data={auditConfig} onUpdate={handleConfigUpdate} />
      </div>

      <SecurityLogTable
        logs={filteredLogs}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onRefresh={fetchLogs}
        loading={loadingLogs}
      />
    </div>
  );
}