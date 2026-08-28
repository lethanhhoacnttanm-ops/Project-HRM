import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Star, Users, Building2, Eye } from "lucide-react";

export default function TeamPerformanceTable({ data, onViewDetail }) {
  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50/70 border-b border-slate-100">
          <TableRow>
            <TableHead className="py-4 px-6 text-slate-700 font-semibold text-sm">
              Tên phòng ban
            </TableHead>

            <TableHead className="py-4 px-6 text-slate-700 font-semibold text-sm">
              Thành viên
            </TableHead>

            <TableHead className="py-4 px-6 text-slate-700 font-semibold text-sm">
              ĐTB OutSourcing
            </TableHead>

            <TableHead className="py-4 px-6 text-slate-700 font-semibold text-sm">
              ĐTB Đào tạo
            </TableHead>

            <TableHead className="py-4 px-6 text-slate-700 font-semibold text-sm">
              Điểm tổng (Overall)
            </TableHead>

            <TableHead className="py-4 px-6 text-slate-700 font-semibold text-sm text-center">
              Thao tác
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-slate-100">
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <TableRow key={item.departmentId || index} className="hover:bg-slate-50/50 transition-colors">

                <TableCell className="py-4 px-6 font-medium text-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <span>{item.departmentName || 'Chưa phân loại'}</span>
                  </div>
                </TableCell>

                <TableCell className="py-4 px-6 text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-slate-400" />
                    <span className="font-medium">{item.memberCount || 0} nhân sự</span>
                  </div>
                </TableCell>

                <TableCell className="py-4 px-6">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-800">
                      {item.avgOutsourcingScore || 0.0} <span className="text-xs font-normal text-slate-400">/5</span>
                    </span>
                    <Star className="w-4 h-4 text-green-400 fill-green-400 drop-shadow-sm" />
                  </div>
                </TableCell>

                <TableCell className="py-4 px-6">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-800">
                      {item.avgTrainingScore || 0.0} <span className="text-xs font-normal text-slate-400">/5</span>
                    </span>
                    <Star className="w-4 h-4 text-green-400 fill-green-400 drop-shadow-sm" />
                  </div>
                </TableCell>

                <TableCell className="py-4 px-6">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-indigo-600 text-base">
                      {item.departmentOverallScore || 0.0}
                    </span>
                    <Star className="w-4 h-4 text-green-500 fill-green-400 drop-shadow-sm" />
                    <span className="text-xs text-slate-400 font-normal">tổng sao</span>
                  </div>
                </TableCell>

                <TableCell className="py-4 px-6 text-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewDetail && onViewDetail(item)}
                    className="h-8 px-3 border-indigo-100 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 transition-colors gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Xem chi tiết
                  </Button>
                </TableCell>

              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-slate-400">
                Không có dữ liệu hiệu suất nhóm nào được tìm thấy.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}