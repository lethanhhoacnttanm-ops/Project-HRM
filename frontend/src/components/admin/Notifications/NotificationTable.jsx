import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, BellOff, Eye } from 'lucide-react';

const NotificationTable = ({ data, loading, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="bg-slate-50/80">
          <TableRow>
            <TableHead className="font-bold text-slate-700 text-xs">Tiêu đề thông báo</TableHead>
            <TableHead className="font-bold text-slate-700 text-xs">Phân loại</TableHead>
            <TableHead className="font-bold text-slate-700 text-xs">Nhóm nhận</TableHead>
            <TableHead className="font-bold text-slate-700 text-xs">Trạng thái</TableHead>
            <TableHead className="font-bold text-slate-700 text-xs text-center">Đã đọc</TableHead>
            <TableHead className="font-bold text-slate-700 text-xs text-right">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-10 text-slate-400 text-xs">
                Đang tải dữ liệu thông báo...
              </TableCell>
            </TableRow>
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-12 text-slate-400 text-xs space-y-2">
                <BellOff className="w-8 h-8 mx-auto text-slate-300" />
                <p>Không tìm thấy thông báo nào phù hợp.</p>
              </TableCell>
            </TableRow>
          ) : (
            data.map((item) => (
              <TableRow key={item._id} className="hover:bg-slate-50/50 transition-colors">
                <TableCell className="max-w-70">
                  <div className="font-semibold text-slate-900 text-xs truncate">{item.title}</div>
                  <div className="text-[11px] text-slate-500 truncate">{item.subTitle || item.content}</div>
                </TableCell>
                
                <TableCell>
                  <Badge variant="outline" className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 text-indigo-700 border-indigo-200">
                    {item.type}
                  </Badge>
                </TableCell>

                <TableCell className="text-xs text-slate-600 font-medium">
                  {item.recipientGroup}
                </TableCell>

                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    item.status === 'Đã gửi' ? 'bg-emerald-50 text-emerald-700' :
                    item.status === 'Nháp' ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {item.status}
                  </span>
                </TableCell>

                <TableCell className="text-center text-xs font-bold text-indigo-600">
                  {item.readCount || 0} người
                </TableCell>

                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => onEdit(item)}
                      className="h-8 w-8 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 cursor-pointer"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => onDelete(item._id)}
                      className="h-8 w-8 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default NotificationTable;