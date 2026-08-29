import React, { useState } from "react";
import { Calendar as CalendarIcon, Search, MoreVertical, ChevronLeft, ChevronRight, Plus, Lock, Unlock, Edit, FileText, User } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export default function MonthlyPayrollView({ payrollData = [], onOpenModal, onToggleLock }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("08-2026");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredData = payrollData.filter((item) => {
    const fullName = item.employee?.fullName?.toLowerCase() || "";
    const code = item.employee?.code?.toLowerCase() || "";
    const term = searchTerm.toLowerCase();

    const matchesSearch = fullName.includes(term) || code.includes(term);
    const matchesStatus = selectedStatus === "all" || item.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-4 bg-indigo-50/30 border-b border-slate-100 flex flex-col md:flex-row items-center gap-3">
        <div className="w-full md:w-44">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-full border-slate-200 text-xs font-semibold text-slate-700 bg-white rounded-xl h-10 shadow-none">
              <CalendarIcon className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
              <SelectValue placeholder="Chọn kỳ lương" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="08-2026" className="text-xs font-medium cursor-pointer">Tháng 08/2026</SelectItem>
              <SelectItem value="07-2026" className="text-xs font-medium cursor-pointer">Tháng 07/2026</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full md:w-44">
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-full border-slate-200 text-xs font-semibold text-slate-700 bg-white rounded-xl h-10 shadow-none">
              <SelectValue placeholder="Tất cả trạng thái" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="all" className="text-xs font-medium cursor-pointer">Tất cả trạng thái</SelectItem>
              <SelectItem value="Đang xử lý" className="text-xs font-medium cursor-pointer">Đang xử lý</SelectItem>
              <SelectItem value="Đã chốt" className="text-xs font-medium cursor-pointer">Đã chốt</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="relative w-full md:flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo tên hoặc mã nhân viên..."
            className="pl-10 bg-white border-slate-200 rounded-xl text-xs h-10 text-slate-700 placeholder:text-slate-400 shadow-none"
          />
        </div>

        <Button
          onClick={() => onOpenModal("add_member")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-sm cursor-pointer border-0 h-10 w-full md:w-auto"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          <span>Bổ sung nhân viên</span>
        </Button>
      </div>

      <Table>
        <TableHeader className="bg-slate-50/80">
          <TableRow>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">NHÂN VIÊN</TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">MÃ HĐ</TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">LƯƠNG CƠ BẢN</TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">PHỤ CẤP</TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">THƯỞNG / PHẠT</TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">THỰC NHẬN (NET)</TableHead>
            <TableHead className="py-4 px-6 text-center text-slate-500 font-bold text-xs uppercase">TRẠNG THÁI</TableHead>
            <TableHead className="py-4 px-6 text-center text-slate-500 font-bold text-xs uppercase">THAO TÁC</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-slate-100 text-xs">
          {filteredData.length > 0 ? (
            filteredData.map((row) => {
              const calculatedNet = (row.baseSalary || 0) + (row.allowance || 0) + (row.bonus || 0) - (row.deductions || 0);

              return (
                <TableRow key={row._id} className="hover:bg-slate-50/80 transition-colors">
                  <TableCell className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      {row.employee?.avatarUrl ? (
                        <img
                          src={row.employee.avatarUrlr}
                          alt={row.employee?.fullName}
                          className="w-9 h-9 rounded-full object-cover border dark:border-gray-700"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-gray-800 flex items-center justify-center text-slate-400 dark:text-gray-500">
                          <User className="w-4 h-4" />
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-slate-800">{row.employee?.fullName || "Chưa cập nhật"}</p>
                        <p className="text-[11px] text-slate-400">{row.employee?.code || "---"}</p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="py-4 px-6 font-medium text-slate-600">
                    {row.contract?.contractCode || "---"}
                  </TableCell>

                  <TableCell className="py-4 px-6 font-semibold text-slate-700">
                    {(row.baseSalary || 0).toLocaleString()} đ
                  </TableCell>

                  <TableCell className="py-4 px-6 text-blue-600 font-medium">
                    +{(row.allowance || 0).toLocaleString()} đ
                  </TableCell>

                  <TableCell className="py-4 px-6">
                    <div className="flex flex-col">
                      <span className="text-emerald-600 font-semibold">+{(row.bonus || 0).toLocaleString()} đ</span>
                      {(row.deductions > 0) && (
                        <span className="text-rose-600 font-medium text-[11px]">-{(row.deductions).toLocaleString()} đ (Phạt)</span>
                      )}
                    </div>
                  </TableCell>

                  <TableCell className="py-4 px-6">
                    <span className="font-black text-indigo-600 text-sm">
                      {calculatedNet > 0 ? calculatedNet.toLocaleString() : 0} đ
                    </span>
                  </TableCell>

                  <TableCell className="py-4 px-6 text-center">
                    <Badge
                      variant={row.status === "Đã chốt" ? "default" : "secondary"}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border-0 ${row.status === "Đã chốt"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                        }`}
                    >
                      {row.status || "Đang xử lý"}
                    </Badge>
                  </TableCell>

                  <TableCell className="py-4 px-6 text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger render={(
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600 rounded-lg">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      )}/>
                      <DropdownMenuContent align="end" className="w-48 rounded-xl p-1">
                        {!row.isLocked && (
                        <DropdownMenuItem
                          onClick={() => onOpenModal("adjust", row)}
                          disabled={row.isLocked}
                          className={`text-xs font-medium cursor-pointer rounded-lg px-3 py-2 ${row.isLocked ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                          <Edit className="w-3.5 h-3.5 mr-2 text-indigo-600" />
                          Điều chỉnh lương
                        </DropdownMenuItem>
                        )}

                        <DropdownMenuItem
                          onClick={() => onOpenModal("view", row)}
                          className="text-xs font-medium cursor-pointer rounded-lg px-3 py-2"
                        >
                          <FileText className="w-3.5 h-3.5 mr-2 text-blue-600" />
                          Xem phiếu lương (Payslip)
                        </DropdownMenuItem>

                        <DropdownMenuSeparator className="my-1 bg-slate-100" />

                        <DropdownMenuItem
                          onClick={() => onToggleLock && onToggleLock(row._id, !row.isLocked)}
                          className="text-xs font-medium cursor-pointer rounded-lg px-3 py-2 text-amber-600 focus:text-amber-700"
                        >
                          {row.isLocked ? (
                            <>
                              <Unlock className="w-3.5 h-3.5 mr-2" /> Mở khóa chỉnh sửa
                            </>
                          ) : (
                            <>
                              <Lock className="w-3.5 h-3.5 mr-2" /> Khóa bảng lương
                            </>
                          )}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8 text-slate-400 text-xs font-medium">
                Không tìm thấy bản ghi bảng lương nào phù hợp.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 text-xs text-slate-500">
        <p>Hiển thị {filteredData.length} nhân viên</p>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" className="h-7 w-7 text-slate-400 rounded-lg">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button className="h-7 w-7 bg-indigo-600 text-white font-bold text-xs rounded-lg p-0">1</Button>
          <Button variant="outline" size="icon" className="h-7 w-7 text-slate-400 rounded-lg">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}