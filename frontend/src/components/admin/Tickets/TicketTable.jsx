import React from "react";
import { User, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const tickets = [
  {
    id: "#TK-4592",
    employeeName: "Nguyễn Văn A",
    avatar: null,
    issue: "Lỗi đăng nhập Portal",
    priority: "Cao",
    priorityBg: "bg-rose-100 text-rose-600",
    createdDate: "Hôm nay, 09:24 AM",
    status: "Mở",
    statusBg: "bg-indigo-100 text-indigo-700",
  },
  {
    id: "#TK-4588",
    employeeName: "Trần Thị B",
    avatar: null,
    issue: "Sai lệch bảng lương tháng 10",
    priority: "Trung bình",
    priorityBg: "bg-slate-200 text-slate-700",
    createdDate: "Hôm qua, 14:15 PM",
    status: "Đang xử lý",
    statusBg: "bg-teal-100 text-teal-700",
  },
  {
    id: "#TK-4581",
    employeeName: "Lê Văn C",
    avatar: null,
    issue: "Yêu cầu cấp thêm thiết bị",
    priority: "Thấp",
    priorityBg: "bg-indigo-50 text-indigo-600",
    createdDate: "12/10/2023, 10:00 AM",
    status: "Đã giải quyết",
    statusBg: "bg-emerald-100 text-emerald-700",
  },
];

export default function TicketTable() {
  return (
    <div className="bg-white rounded-b-2xl overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50/80">
          <TableRow>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">
              MÃ VÉ
            </TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">
              NHÂN VIÊN
            </TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">
              VẤN ĐỀ
            </TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">
              MỨC ĐỘ
            </TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">
              NGÀY GỬI
            </TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">
              TRẠNG THÁI
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-slate-100 text-xs">
          {tickets.map((row) => (
            <TableRow key={row.id} className="hover:bg-slate-50/80 transition-colors">
              <TableCell className="py-4 px-6 font-extrabold text-indigo-600">
                {row.id}
              </TableCell>

              <TableCell className="py-4 px-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 border">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-slate-800">{row.employeeName}</span>
                </div>
              </TableCell>

              <TableCell className="py-4 px-6 font-semibold text-slate-700 max-w-xs">
                {row.issue}
              </TableCell>

              <TableCell className="py-4 px-6">
                <Badge className={`font-semibold text-[10px] px-2.5 py-0.5 rounded-full border-0 shadow-none ${row.priorityBg}`}>
                  • {row.priority}
                </Badge>
              </TableCell>

              <TableCell className="py-4 px-6 text-slate-500 font-medium">
                {row.createdDate}
              </TableCell>

              <TableCell className="py-4 px-6">
                <Badge className={`font-semibold text-[11px] px-3 py-1 rounded-full border-0 shadow-none ${row.statusBg}`}>
                  {row.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 text-xs">
        <Button variant="outline" size="icon" className="h-7 w-7 text-slate-400 hover:bg-slate-50">
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <div className="flex items-center gap-1">
          <Button className="h-7 w-7 bg-indigo-600 text-white font-bold text-xs p-0">1</Button>
          <Button variant="ghost" className="h-7 w-7 text-slate-600 text-xs p-0">2</Button>
          <Button variant="ghost" className="h-7 w-7 text-slate-600 text-xs p-0">3</Button>
        </div>

        <Button variant="outline" size="icon" className="h-7 w-7 text-slate-400 hover:bg-slate-50">
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}