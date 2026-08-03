import React, { useState } from "react";
import { Calendar as CalendarIcon, Search, MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";
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
} from "@/components/ui/dropdown-menu";

const payrollData = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    code: "ID: EMP001",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    department: "Kỹ thuật",
    baseSalary: "25,000,000",
    allowance: "2,000,000",
    bonus: "1,500,000",
    netSalary: "27,850,000",
    statusBg: "bg-teal-400 w-3 h-3 rounded-full",
  },
  {
    id: 2,
    name: "Lê Thị B",
    code: "ID: EMP042",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    department: "Nhân sự",
    baseSalary: "18,000,000",
    allowance: "1,000,000",
    bonus: "0",
    netSalary: "18,200,000",
    statusBg: "bg-indigo-300 w-3 h-3 rounded-full",
  },
  {
    id: 3,
    name: "Trần Văn C",
    code: "ID: EMP105",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    department: "Kinh doanh",
    baseSalary: "30,000,000",
    allowance: "5,000,000",
    bonus: "12,400,000",
    netSalary: "43,800,000",
    statusBg: "bg-slate-300 w-3 h-3 rounded-full",
  },
];

export default function MonthlyPayrollView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("05_2024");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  return (
    <div className="bg-white rounded-b-2xl overflow-hidden">
      <div className="p-4 bg-indigo-50/30 border-b border-slate-100 flex flex-col md:flex-row items-center gap-3">
        <div className="w-full md:w-40">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-full border-slate-200 text-xs font-semibold text-slate-700 bg-white rounded-xl h-9">
              <CalendarIcon className="w-3.5 h-3.5 mr-1 text-slate-400" />
              <SelectValue placeholder="Tháng 05/2024" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="05_2024" className="text-xs font-medium">Tháng 05/2024</SelectItem>
              <SelectItem value="04_2024" className="text-xs font-medium">Tháng 04/2024</SelectItem>
            </SelectContent>
          </Select>
        </div>

      
        <div className="w-full md:w-44">
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-full border-slate-200 text-xs font-semibold text-slate-700 bg-white rounded-xl h-9">
              <SelectValue placeholder="Tất cả phòng ban" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="all" className="text-xs font-medium">Tất cả phòng ban</SelectItem>
              <SelectItem value="tech" className="text-xs font-medium">Kỹ thuật</SelectItem>
              <SelectItem value="hr" className="text-xs font-medium">Nhân sự</SelectItem>
              <SelectItem value="sales" className="text-xs font-medium">Kinh doanh</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="relative w-full md:flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" />
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm tên nhân viên..."
            className="pl-10 bg-white border-slate-200 rounded-xl text-xs h-9 text-slate-700 placeholder:text-slate-400 shadow-none"
          />
        </div>
      </div>

      <Table>
        <TableHeader className="bg-slate-50/80">
          <TableRow>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">NHÂN VIÊN</TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">PHÒNG BAN</TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">LƯƠNG CƠ BẢN</TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">PHỤ CẤP</TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">THƯỞNG</TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">THỰC NHẬN</TableHead>
            <TableHead className="py-4 px-6 text-center text-slate-500 font-bold text-xs uppercase">THAO TÁC</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-slate-100 text-xs">
          {payrollData.map((row) => (
            <TableRow key={row.id} className="hover:bg-slate-50/80 transition-colors">
              <TableCell className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <img src={row.avatar} alt={row.name} className="w-9 h-9 rounded-full object-cover border" />
                  <div>
                    <p className="font-bold text-slate-800">{row.name}</p>
                    <p className="text-[11px] text-slate-400">{row.code}</p>
                  </div>
                </div>
              </TableCell>

              <TableCell className="py-4 px-6 font-medium text-slate-600">{row.department}</TableCell>
              <TableCell className="py-4 px-6 font-semibold text-slate-700">{row.baseSalary}</TableCell>
              <TableCell className="py-4 px-6 text-slate-600 font-medium">{row.allowance}</TableCell>
              <TableCell className="py-4 px-6 font-bold text-emerald-600">{row.bonus}</TableCell>
              
              <TableCell className="py-4 px-6">
                <span className="font-black text-indigo-600 text-sm">{row.netSalary}</span>
              </TableCell>

              <TableCell className="py-4 px-6 text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg outline-none">
                    <MoreVertical className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-44 rounded-xl">
                    <DropdownMenuItem className="text-xs font-medium cursor-pointer">Xem phiếu lương (Payslip)</DropdownMenuItem>
                    <DropdownMenuItem className="text-xs font-medium cursor-pointer">Điều chỉnh phụ cấp</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 text-xs text-slate-500">
        <p>Hiển thị 10/156 nhân viên</p>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" className="h-7 w-7 text-slate-400 hover:bg-slate-50">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button className="h-7 w-7 bg-indigo-600 text-white font-bold text-xs p-0">1</Button>
          <Button variant="ghost" className="h-7 w-7 text-slate-600 text-xs p-0">2</Button>
          <Button variant="ghost" className="h-7 w-7 text-slate-600 text-xs p-0">3</Button>
          <Button variant="outline" size="icon" className="h-7 w-7 text-slate-400 hover:bg-slate-50">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}