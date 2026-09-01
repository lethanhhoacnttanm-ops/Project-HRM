import { Activity, Globe, Clock, Power, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function SecurityConfigCard({ type, data, onUpdate }) {
  if (type === 'ratelimit') {
    return (
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <Activity className="size-4" />
            </div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Rate Limiting</h3>
          </div>
          <button 
            onClick={() => onUpdate('toggleRateLimit')}
            className={`px-3 py-1 rounded-full text-[11px] font-bold transition-colors cursor-pointer ${
              data.isActive ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-rose-50 text-rose-600 border border-rose-200'
            }`}
          >
            {data.isActive ? 'Đang bật' : 'Đã tắt'}
          </button>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          Chống tấn công DDoS và Brute-force bằng cách giới hạn số lượng request từ một IP.
        </p>
        <div className="space-y-1.5 pt-2 border-t border-slate-50">
          <label className="text-[11px] font-semibold text-slate-700">Giới hạn tối đa (Requests / 15 phút):</label>
          <div className="flex gap-2">
            <Input 
              type="number" 
              value={data.maxRequests} 
              onChange={(e) => onUpdate('setMaxRequests', e.target.value)}
              className="h-9 rounded-xl text-xs"
            />
            <Button onClick={() => onUpdate('saveRateLimit')} className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs h-9 rounded-xl px-4 cursor-pointer">
              Lưu
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'cors') {
    return (
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <Globe className="size-4" />
            </div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">CORS Domains</h3>
          </div>
          <span className="text-[11px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
            {data.domains.length} domains
          </span>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          Quản lý danh sách Domain Frontend được phép gọi API trực tiếp vào hệ thống.
        </p>
        <form onSubmit={(e) => { e.preventDefault(); onUpdate('addDomain'); }} className="space-y-2 pt-2 border-t border-slate-50">
          <div className="flex gap-2">
            <Input 
              placeholder="https://domain.com" 
              value={data.newDomain}
              onChange={(e) => onUpdate('setNewDomain', e.target.value)}
              className="h-9 rounded-xl text-xs"
            />
            <Button type="submit" variant="outline" className="h-9 text-xs rounded-xl cursor-pointer">
              Thêm
            </Button>
          </div>
          <div className="max-h-20 overflow-y-auto space-y-1 pr-1">
            {data.domains.map((d, index) => (
              <div key={index} className="flex items-center justify-between bg-slate-50 px-2.5 py-1 rounded-lg text-[11px] text-slate-700">
                <span className="truncate max-w-45">{d}</span>
                <button type="button" onClick={() => onUpdate('removeDomain', d)} className="text-rose-500 hover:text-rose-700 font-bold ml-2">×</button>
              </div>
            ))}
          </div>
        </form>
      </div>
    );
  }

  if (type === 'audit') {
    return (
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
                <Clock className="size-4" />
              </div>
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Ghi Log Hoạt Động</h3>
            </div>
            <button 
              onClick={() => onUpdate('toggleAudit')}
              className={`p-2 rounded-xl transition-colors cursor-pointer ${
                data.isActive ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
              }`}
              title={data.isActive ? "Đang bật lưu log" : "Đã tắt lưu log"}
            >
              <Power className="size-4" />
            </button>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Công tắc tổng hệ thống ghi nhận lịch sử thao tác. Dữ liệu cũ hơn 24 giờ sẽ tự động được dọn dẹp tại Database (TTL Index).
          </p>
        </div>
        <div className="bg-indigo-50/60 p-3 rounded-xl border border-indigo-100 flex items-center gap-2.5">
          <CheckCircle2 className="size-4 text-indigo-600 shrink-0" />
          <span className="text-[11px] text-indigo-900 font-medium">Hệ thống TTL Index đang hoạt động ổn định.</span>
        </div>
      </div>
    );
  }

  return null;
}