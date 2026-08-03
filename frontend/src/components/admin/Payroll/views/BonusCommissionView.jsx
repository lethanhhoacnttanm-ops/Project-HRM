import React from "react";
import { Gift, MoreVertical } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const bonusData = [
  {
    id: 1,
    name: "Trần Văn C",
    department: "Kinh doanh",
    type: "Hoa hồng doanh số Q2",
    amount: "12,400,000 VNĐ",
    status: "Đã duyệt",
    statusBg: "bg-teal-100 text-teal-700",
  },
  {
    id: 2,
    name: "Nguyễn Văn A",
    department: "Kỹ thuật",
    type: "Thưởng dự án EduPress",
    amount: "1,500,000 VNĐ",
    status: "Đã duyệt",
    statusBg: "bg-teal-100 text-teal-700",
  },
];

export default function BonusCommissionView() {
  return (
    <div className="bg-white rounded-b-2xl overflow-hidden p-4">
      <Table>
        <TableHeader className="bg-slate-50/80">
          <TableRow>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">NHÂN VIÊN</TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">PHÒNG BAN</TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">LOẠI THƯỞNG / HOA HỒNG</TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">SỐ TIỀN</TableHead>
            <TableHead className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">TRẠNG THÁI</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-slate-100 text-xs">
          {bonusData.map((row) => (
            <TableRow key={row.id} className="hover:bg-slate-50/80 transition-colors">
              <TableCell className="py-4 px-6 font-bold text-slate-800">{row.name}</TableCell>
              <TableCell className="py-4 px-6 text-slate-600">{row.department}</TableCell>
              <TableCell className="py-4 px-6 font-semibold text-slate-700 flex items-center gap-2">
                <Gift className="w-4 h-4 text-emerald-500" />
                <span>{row.type}</span>
              </TableCell>
              <TableCell className="py-4 px-6 font-extrabold text-emerald-600">{row.amount}</TableCell>
              <TableCell className="py-4 px-6">
                <Badge className={`font-semibold text-[11px] px-3 py-1 rounded-full border-0 shadow-none ${row.statusBg}`}>
                  {row.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}