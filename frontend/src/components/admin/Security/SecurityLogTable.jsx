import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

export function SecurityLogTable({ logs, searchTerm, setSearchTerm, onRefresh, loading }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Nhật Ký Hoạt Động Thời Gian Thực (24h)</h2>
          <button onClick={onRefresh} className="p-1 text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer" title="Làm mới">
            <RefreshCw className={`size-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
        <div className="w-full sm:w-72">
          <Input 
            placeholder="Tìm theo nhân viên, IP, hoạt động..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-9 rounded-xl text-xs bg-slate-50/50 border-slate-200"
          />
        </div>
      </div>

      <Table>
        <TableHeader className="bg-slate-50/80">
          <TableRow>
            <TableHead className="text-[11px] font-bold text-slate-600 py-3 px-4">Người dùng</TableHead>
            <TableHead className="text-[11px] font-bold text-slate-600 py-3 px-4">Thiết bị / Trình duyệt</TableHead>
            <TableHead className="text-[11px] font-bold text-slate-600 py-3 px-4">Địa chỉ IP</TableHead>
            <TableHead className="text-[11px] font-bold text-slate-600 py-3 px-4">Vị trí</TableHead>
            <TableHead className="text-[11px] font-bold text-slate-600 py-3 px-4">Hoạt động</TableHead>
            <TableHead className="text-[11px] font-bold text-slate-600 py-3 px-4">Thời gian</TableHead>
            <TableHead className="text-[11px] font-bold text-slate-600 py-3 px-4 text-right">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-xs text-slate-400">
                Không có nhật ký hoạt động nào trong vòng 24 giờ qua.
              </TableCell>
            </TableRow>
          ) : (
            logs.map((log) => (
              <TableRow key={log._id || log.id} className="hover:bg-slate-50/50 transition-colors">
                <TableCell className="py-3 px-4 text-xs font-bold text-slate-800">{log.userName}</TableCell>
                <TableCell className="py-3 px-4 text-xs text-slate-600">{log.device}</TableCell>
                <TableCell className="py-3 px-4 text-xs font-mono text-indigo-600 font-semibold">{log.ipAddress}</TableCell>
                <TableCell className="py-3 px-4 text-xs text-slate-600">{log.location}</TableCell>
                <TableCell className="py-3 px-4 text-xs">
                  <span className="bg-indigo-50 text-indigo-700 font-medium px-2 py-0.5 rounded-md">
                    {log.action}
                  </span>
                </TableCell>
                <TableCell className="py-3 px-4 text-xs text-slate-400">
                  {new Date(log.createdAt).toLocaleTimeString()}
                </TableCell>
                <TableCell className="py-3 px-4 text-xs text-right">
                  <Button variant="ghost" size="sm" className="h-7 text-xs text-slate-500 hover:text-indigo-600 cursor-pointer">
                    Chi tiết
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Phân trang UI cơ bản */}
      <div className="p-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Hiển thị trang 1 của 1 (Tự động dọn dẹp sau 24h)</span>
        <div className="flex gap-1">
          <Button variant="outline" size="sm" disabled className="h-7 text-xs rounded-lg">Trước</Button>
          <Button variant="outline" size="sm" disabled className="h-7 text-xs rounded-lg">Sau</Button>
        </div>
      </div>
    </div>
  );
}