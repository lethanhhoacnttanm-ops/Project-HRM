import React from "react";
import { Laptop, Smartphone, LogOut } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const initialSessions = [
  {
    id: 1,
    name: "Nguyễn Lan",
    role: "HR Manager",
    initials: "NL",
    device: "Chrome / macOS",
    deviceType: "laptop",
    ip: "192.168.1.45",
    location: "Hà Nội, Việt Nam",
    lastActive: "Vừa xong",
  },
  {
    id: 2,
    name: "Trần Văn",
    role: "Developer",
    initials: "TV",
    device: "Safari / iPhone 15",
    deviceType: "mobile",
    ip: "203.113.148.2",
    location: "TP. Hồ Chí Minh",
    lastActive: "15 phút trước",
  },
];

export default function SessionManagementTable({ onRevokeSession, onRevokeAll }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm space-y-3">
      {/* Table Header Action Bar */}
      <div className="p-5 pb-2 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-800 text-sm">Quản lý Phiên truy cập</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Danh sách các thiết bị hiện đang đăng nhập vào hệ thống.
          </p>
        </div>

        <Button
          variant="outline"
          onClick={onRevokeAll}
          className="border-indigo-200 text-indigo-600 hover:bg-indigo-50 font-semibold text-xs h-9 rounded-xl gap-1.5"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Đăng xuất tất cả</span>
        </Button>
      </div>

      <Table>
        <TableHeader className="bg-slate-50/80">
          <TableRow>
            <TableHead className="py-3.5 px-6 text-slate-500 font-bold text-xs uppercase">
              NGƯỜI DÙNG
            </TableHead>
            <TableHead className="py-3.5 px-6 text-slate-500 font-bold text-xs uppercase">
              THIẾT BỊ / TRÌNH DUYỆT
            </TableHead>
            <TableHead className="py-3.5 px-6 text-slate-500 font-bold text-xs uppercase">
              ĐỊA CHỈ IP
            </TableHead>
            <TableHead className="py-3.5 px-6 text-slate-500 font-bold text-xs uppercase">
              VỊ TRÍ
            </TableHead>
            <TableHead className="py-3.5 px-6 text-slate-500 font-bold text-xs uppercase">
              HOẠT ĐỘNG CUỐI
            </TableHead>
            <TableHead className="py-3.5 px-6 text-center text-slate-500 font-bold text-xs uppercase">
              THAO TÁC
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-slate-100 text-xs">
          {initialSessions.map((row) => (
            <TableRow key={row.id} className="hover:bg-slate-50/80 transition-colors">
              <TableCell className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">
                    {row.initials}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{row.name}</p>
                    <p className="text-[11px] text-slate-400">{row.role}</p>
                  </div>
                </div>
              </TableCell>

              <TableCell className="py-4 px-6">
                <div className="flex items-center gap-2 font-medium text-slate-700">
                  {row.deviceType === "laptop" ? (
                    <Laptop className="w-4 h-4 text-slate-400" />
                  ) : (
                    <Smartphone className="w-4 h-4 text-slate-400" />
                  )}
                  <span>{row.device}</span>
                </div>
              </TableCell>

              <TableCell className="py-4 px-6 font-mono text-slate-600">
                {row.ip}
              </TableCell>

              <TableCell className="py-4 px-6 font-medium text-slate-600">
                {row.location}
              </TableCell>

              <TableCell className="py-4 px-6 text-slate-500 font-medium">
                {row.lastActive}
              </TableCell>

              <TableCell className="py-4 px-6 text-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onRevokeSession(row)}
                  className="border-rose-200 text-rose-600 hover:bg-rose-50 text-[11px] font-bold h-7 rounded-lg"
                >
                  Thu hồi
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}