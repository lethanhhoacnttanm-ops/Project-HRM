import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const payrollRows = [
  { department: "Engineering", count: 432, budget: "10.5 tỷ VNĐ", growth: "+4.2%", isPositive: true },
  { department: "Sales & Marketing", count: 312, budget: "8.2 tỷ VNĐ", growth: "+2.8%", isPositive: true },
  { department: "Human Resources", count: 84, budget: "2.1 tỷ VNĐ", growth: "-1.5%", isPositive: false },
  { department: "Operations", count: 156, budget: "3.8 tỷ VNĐ", growth: "+0.8%", isPositive: true },
  { department: "Customer Support", count: 264, budget: "5.4 tỷ VNĐ", growth: "+5.1%", isPositive: true },
];

export default function PayrollDistributionTable() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm space-y-2">
      <div className="p-5 pb-2 flex items-center justify-between">
        <h3 className="font-bold text-slate-800 text-sm">Phân bố ngân sách Payroll</h3>
        <button className="text-xs font-bold text-indigo-600 hover:text-indigo-800">
          Xem chi tiết
        </button>
      </div>

      <Table>
        <TableHeader className="bg-indigo-50/50">
          <TableRow>
            <TableHead className="py-3 px-6 text-slate-500 font-bold text-xs uppercase">PHÒNG BAN</TableHead>
            <TableHead className="py-3 px-6 text-slate-500 font-bold text-xs uppercase">SỐ LƯỢNG NV</TableHead>
            <TableHead className="py-3 px-6 text-slate-500 font-bold text-xs uppercase">TỔNG NGÂN SÁCH</TableHead>
            <TableHead className="py-3 px-6 text-slate-500 font-bold text-xs uppercase">TĂNG TRƯỞNG</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-slate-100 text-xs">
          {payrollRows.map((row, idx) => (
            <TableRow key={idx} className="hover:bg-slate-50/80 transition-colors">
              <TableCell className="py-3.5 px-6 font-bold text-slate-800">{row.department}</TableCell>
              <TableCell className="py-3.5 px-6 text-slate-600 font-medium">{row.count}</TableCell>
              <TableCell className="py-3.5 px-6 font-bold text-slate-800">{row.budget}</TableCell>
              <TableCell className={`py-3.5 px-6 font-bold ${row.isPositive ? "text-emerald-600" : "text-rose-500"}`}>
                {row.growth}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}