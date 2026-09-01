import React from "react";
import { User, MoreHorizontal, Wrench, Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const statusConfig = {
  'Mở': 'bg-indigo-50 text-indigo-700 border border-indigo-200',
  'Đang xử lý': 'bg-teal-50 text-teal-700 border border-teal-200',
  'Đã giải quyết': 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  'Đóng': 'bg-slate-100 text-slate-700 border border-slate-200',
};

const priorityConfig = {
  'Cao': 'bg-rose-50 text-rose-600 border border-rose-200',
  'Trung bình': 'bg-amber-50 text-amber-700 border border-amber-200',
  'Thấp': 'bg-slate-100 text-slate-600 border border-slate-200',
};

const formatDate = (date) => {
  if (!date) return '—';
  return new Date(date).toLocaleString('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });
};

export default function TicketTable({ tickets = [], onOpenModal }) {
  return (
    <div className="bg-white rounded-b-2xl overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50/80">
          <TableRow>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">MÃ PHIẾU</TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">NHÂN VIÊN</TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">TIÊU ĐỀ & DANH MỤC</TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">MỨC ĐỘ</TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">NGÀY GỬI</TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">TRẠNG THÁI</TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase text-right">HÀNH ĐỘNG</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-slate-100 text-xs">
          {tickets.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="py-12 text-center text-slate-400">
                Không tìm thấy yêu cầu hỗ trợ nào.
              </TableCell>
            </TableRow>
          ) : (
            tickets.map((row) => {
              const statusClass = statusConfig[row.status] || 'bg-slate-100 text-slate-700';
              const priorityClass = priorityConfig[row.priority] || 'bg-slate-100 text-slate-600';

              return (
                <TableRow key={row._id} className="hover:bg-slate-50/80 transition-colors">
                  <TableCell className="py-4 px-6 font-mono font-bold text-indigo-600">
                    {row.ticketCode}
                  </TableCell>

                  <TableCell className="py-4 px-6">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200 shrink-0">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold text-slate-800 block">{row.employee?.fullName || '—'}</span>
                        <span className="text-[11px] text-slate-400 block">{row.employee?.email}</span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="py-4 px-6 max-w-xs">
                    <p className="font-bold text-slate-800">{row.title}</p>
                    <span className="text-[11px] text-slate-500 mt-0.5 inline-block font-medium">
                      {row.category}
                    </span>
                  </TableCell>

                  <TableCell className="py-4 px-6">
                    <Badge className={`font-semibold text-[10px] px-2.5 py-0.5 rounded-full shadow-none ${priorityClass}`}>
                      • {row.priority}
                    </Badge>
                  </TableCell>

                  <TableCell className="py-4 px-6 text-slate-500 font-medium">
                    {formatDate(row.createdAt)}
                  </TableCell>

                  <TableCell className="py-4 px-6">
                    <Badge className={`font-semibold text-[11px] px-3 py-1 rounded-full shadow-none ${statusClass}`}>
                      {row.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="py-4 px-6 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger render={(
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg cursor-pointer"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      )}/>
                      <DropdownMenuContent align="end" className="rounded-xl w-36 text-xs shadow-md border border-slate-100 bg-white p-1">
                        <DropdownMenuItem
                          onClick={() => onOpenModal("action", row)}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 focus:bg-indigo-50 focus:text-indigo-600"
                        >
                          <Wrench className="size-3.5" />
                          Xử lý
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onOpenModal("detail", row)}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 focus:bg-indigo-50 focus:text-indigo-600"
                        >
                          <Eye className="size-3.5" />
                          Xem chi tiết
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}