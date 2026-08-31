import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Users, Edit, Trash2 } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const ProgramListView = ({ data = [], loading, onAction }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50/70">
          <TableRow>
            <TableHead className="w-15 text-center font-bold text-slate-700">STT</TableHead>
            <TableHead className="font-bold text-slate-700">TÊN PHÚC LỢI</TableHead>
            <TableHead className="font-bold text-slate-700">LOẠI</TableHead>
            <TableHead className="font-bold text-slate-700">MỨC HỖ TRỢ</TableHead>
            <TableHead className="font-bold text-slate-700">TẦN SUẤT</TableHead>
            <TableHead className="text-center font-bold text-slate-700">SỐ NHÂN SỰ</TableHead>
            <TableHead className="font-bold text-slate-700">TRẠNG THÁI</TableHead>
            <TableHead className="text-center font-bold text-slate-700 w-20">THAO TÁC</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8 text-slate-400">
                Đang tải dữ liệu...
              </TableCell>
            </TableRow>
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8 text-slate-400">
                Chưa có chính sách phúc lợi nào.
              </TableCell>
            </TableRow>
          ) : (
            data.map((item, index) => (
              <TableRow key={item._id || index} className="hover:bg-slate-50/50 transition-colors">
                <TableCell className="text-center font-medium text-slate-500">
                  {index + 1}
                </TableCell>

                <TableCell className="font-semibold text-slate-900">
                  {item.title}
                </TableCell>

                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    item.type === 'Bảo hiểm' ? 'bg-purple-50 text-purple-700' :
                    item.type === 'Phụ cấp' ? 'bg-blue-50 text-blue-700' : 'bg-cyan-50 text-cyan-700'
                  }`}>
                    {item.type}
                  </span>
                </TableCell>

                <TableCell className="font-bold text-emerald-600">
                  {Number(item.amount || 0).toLocaleString('vi-VN')} VNĐ
                </TableCell>

                <TableCell className="text-slate-600">
                  {item.frequency}
                </TableCell>

                <TableCell className="text-center">
                  <span className="bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full text-xs font-bold">
                    {item.participantsCount || 0} nhân sự
                  </span>
                </TableCell>

                <TableCell>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                    item.status === 'Đang mở' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${item.status === 'Đang mở' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                    {item.status}
                  </span>
                </TableCell>

                <TableCell className="text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0 rounded-full">
                        <MoreHorizontal className="w-4 h-4 text-slate-500" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-xl p-1 shadow-lg border-slate-100">
                      <DropdownMenuItem 
                        onClick={() => onAction('assign', item)}
                        className="flex items-center gap-2 rounded-lg text-xs cursor-pointer py-2"
                      >
                        <Users className="w-4 h-4 text-indigo-600" />
                        <span>Áp dụng cho nhân viên</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => onAction('edit', item)}
                        className="flex items-center gap-2 rounded-lg text-xs cursor-pointer py-2"
                      >
                        <Edit className="w-4 h-4 text-amber-600" />
                        <span>Chỉnh sửa thông tin</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => onAction('delete', item)}
                        className="flex items-center gap-2 rounded-lg text-xs cursor-pointer py-2 text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Xóa chính sách</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProgramListView;