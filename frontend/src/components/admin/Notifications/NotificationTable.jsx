import React from "react";
import { MoreVertical } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const notifications = [
  {
    id: 1,
    title: "Cập nhật Chính sách Bảo hiểm 2024",
    subTitle: "Chi tiết các thay đổi trong quy trình đóng bảo hiểm...",
    type: "Hệ thống",
    typeBg: "bg-indigo-100 text-indigo-700",
    recipient: "Toàn công ty",
    sendDate: "12/10/2023 09:00",
    status: "Đã gửi",
    statusBg: "bg-teal-100 text-teal-700",
  },
  {
    id: 2,
    title: "Thanh toán Lương tháng 9",
    subTitle: "Phiếu lương đã có sẵn trên hệ thống...",
    type: "Lương",
    typeBg: "bg-emerald-100 text-emerald-700",
    recipient: "Toàn công ty",
    sendDate: "30/09/2023 17:30",
    status: "Đã gửi",
    statusBg: "bg-teal-100 text-teal-700",
  },
  {
    id: 3,
    title: "Đánh giá Hiệu suất Quý 3",
    subTitle: "Vui lòng hoàn thành tự đánh giá trước deadline...",
    type: "Hiệu suất",
    typeBg: "bg-purple-100 text-purple-700",
    recipient: "Khối Văn phòng",
    sendDate: "15/10/2023 08:00",
    status: "Đang chờ",
    statusBg: "bg-indigo-100 text-indigo-700",
  },
  {
    id: 4,
    title: "Thông báo Nghỉ lễ Quốc khánh",
    subTitle: "Lịch nghỉ lễ và quy trình trực ca...",
    type: "Nghỉ phép",
    typeBg: "bg-slate-200 text-slate-700",
    recipient: "Phòng Kỹ thuật",
    sendDate: "-",
    status: "Nháp",
    statusBg: "bg-slate-100 text-slate-500",
  },
];

export default function NotificationTable() {
  return (
    <div className="bg-white rounded-b-2xl overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50/80">
          <TableRow>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase w-2/5">
              TIÊU ĐỀ
            </TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">
              LOẠI
            </TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">
              NGƯỜI NHẬN
            </TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">
              NGÀY GỬI
            </TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">
              TRẠNG THÁI
            </TableHead>
            <TableHead className="py-4 px-6 text-center text-slate-500 font-bold text-xs uppercase">
              THAO TÁC
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-slate-100 text-xs">
          {notifications.map((row) => (
            <TableRow key={row.id} className="hover:bg-slate-50/80 transition-colors">
              <TableCell className="py-4 px-6">
                <div>
                  <p className="font-bold text-slate-800 text-sm">{row.title}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5 truncate max-w-xs">
                    {row.subTitle}
                  </p>
                </div>
              </TableCell>

              <TableCell className="py-4 px-6">
                <Badge className={`font-semibold text-[10px] px-2.5 py-1 rounded-md border-0 shadow-none ${row.typeBg}`}>
                  {row.type}
                </Badge>
              </TableCell>

              <TableCell className="py-4 px-6 font-medium text-slate-600">
                {row.recipient}
              </TableCell>

              <TableCell className="py-4 px-6 text-slate-500 font-medium">
                {row.sendDate}
              </TableCell>

              <TableCell className="py-4 px-6">
                <Badge className={`font-semibold text-[11px] px-3 py-1 rounded-full border-0 shadow-none ${row.statusBg}`}>
                  • {row.status}
                </Badge>
              </TableCell>

              <TableCell className="py-4 px-6 text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg outline-none">
                    <MoreVertical className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40 rounded-xl">
                    <DropdownMenuItem className="text-xs font-medium cursor-pointer">
                      Xem chi tiết
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-xs font-medium cursor-pointer">
                      Gửi lại thông báo
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-xs font-medium text-rose-600 cursor-pointer">
                      Xóa thông báo
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 text-xs">
        <Button variant="outline" className="h-8 text-xs font-medium text-slate-600 rounded-xl px-4">
          Trước
        </Button>
        <div className="flex items-center gap-1">
          <Button className="h-7 w-7 bg-indigo-600 text-white font-bold text-xs p-0">1</Button>
          <Button variant="ghost" className="h-7 w-7 text-slate-600 text-xs p-0">2</Button>
          <Button variant="ghost" className="h-7 w-7 text-slate-600 text-xs p-0">3</Button>
          <span className="text-slate-400 px-1">...</span>
          <Button variant="ghost" className="h-7 w-7 text-slate-600 text-xs p-0">12</Button>
        </div>
        <Button variant="outline" className="h-8 text-xs font-medium text-slate-600 rounded-xl px-4">
          Tiếp
        </Button>
      </div>
    </div>
  );
}