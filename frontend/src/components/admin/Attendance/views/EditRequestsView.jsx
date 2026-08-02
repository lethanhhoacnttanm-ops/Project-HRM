import React from "react";
import { Check, X, FileText } from "lucide-react";
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

const requestsData = [
  {
    id: 1,
    name: "Trần Minh C",
    code: "HRM024",
    requestType: "Bổ sung Check-in",
    date: "23/05/2024",
    originalTime: "--:--",
    requestedTime: "08:02",
    reason: "Quên quẹt thẻ do máy chấm công tầng 2 bị lỗi",
    status: "Chờ phê duyệt",
    statusBg: "bg-rose-50 text-rose-600 border-rose-200",
  },
  {
    id: 2,
    name: "Nguyễn Thị B",
    code: "HRM002",
    requestType: "Đổi giờ Check-out",
    date: "22/05/2024",
    originalTime: "16:30",
    requestedTime: "17:30",
    reason: "Gặp khách hàng ngoài công ty về muộn",
    status: "Đã phê duyệt",
    statusBg: "bg-emerald-50 text-emerald-600 border-emerald-200",
  },
];

export default function EditRequestsView() {
  return (
    <div className="bg-white rounded-b-2xl p-6 space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div>
          <h3 className="font-bold text-slate-800 text-sm">
            Danh sách đơn giải trình chấm công
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Xác nhận các yêu cầu điều chỉnh thời gian làm việc từ nhân viên.
          </p>
        </div>
      </div>

      <Table>
        <TableHeader className="bg-slate-50/80">
          <TableRow>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">
              NHÂN VIÊN
            </TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">
              LOẠI YÊU CẦU
            </TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">
              NGÀY
            </TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">
              GIỜ GỐC → ĐỀ XUẤT
            </TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">
              LÝ DO
            </TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">
              TRẠNG THÁI
            </TableHead>
            <TableHead className="py-4 px-6 text-center text-slate-500 font-bold text-xs uppercase">
              XỬ LÝ
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-slate-100 text-xs">
          {requestsData.map((req) => (
            <TableRow key={req.id} className="hover:bg-slate-50/80 transition-colors">
              <TableCell className="py-4 px-6">
                <div>
                  <p className="font-bold text-slate-800">{req.name}</p>
                  <p className="text-[11px] text-slate-400">{req.code}</p>
                </div>
              </TableCell>

              <TableCell className="py-4 px-6 font-semibold text-slate-700">
                {req.requestType}
              </TableCell>

              <TableCell className="py-4 px-6 text-slate-600 font-medium">
                {req.date}
              </TableCell>

              <TableCell className="py-4 px-6">
                <span className="text-slate-400 line-through mr-2">
                  {req.originalTime}
                </span>
                <span className="font-bold text-indigo-600">
                  {req.requestedTime}
                </span>
              </TableCell>

              <TableCell className="py-4 px-6 max-w-xs text-slate-600 leading-tight">
                <div className="flex items-start gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span className="truncate">{req.reason}</span>
                </div>
              </TableCell>

              <TableCell className="py-4 px-6">
                <Badge
                  variant="outline"
                  className={`font-semibold text-[11px] px-2.5 py-0.5 rounded-full ${req.statusBg}`}
                >
                  {req.status}
                </Badge>
              </TableCell>

              <TableCell className="py-4 px-6 text-center">
                {req.status === "Chờ phê duyệt" ? (
                  <div className="flex items-center justify-center gap-1">
                    <Button
                      size="icon"
                      className="h-7 w-7 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7 text-rose-600 hover:bg-rose-50 rounded-lg"
                    >
                      <X className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                ) : (
                  <span className="text-slate-400 font-medium">Hoàn tất</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}