import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  User,
  MoreVertical,
  Eye,
  XCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const ContractTable = ({ contracts, onOpenModal }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs font-semibold">
          <thead>
            <tr className="bg-slate-50/80 border-b border-gray-200 text-gray-700 font-extrabold">
              <th className="py-3.5 px-5">ID</th>
              <th className="py-3.5 px-5">Tên</th>
              <th className="py-3.5 px-5">Loại</th>
              <th className="py-3.5 px-5">Ngày bắt đầu</th>
              <th className="py-3.5 px-5">Ngày kết thúc</th>
              <th className="py-3.5 px-5">Trạng thái</th>
              <th className="py-3.5 px-5 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {contracts.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-3.5 px-5 font-bold text-gray-600">{item.code}</td>

                <td className="py-3.5 px-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 shrink-0">
                      <User className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-800">{item.name}</div>
                      <div className="text-[11px] text-gray-400 font-normal">{item.email}</div>
                    </div>
                  </div>
                </td>

                <td className="py-3.5 px-5">
                  <Badge
                    variant="outline"
                    className={`border-0 px-3 py-1 rounded-xl text-[11px] font-bold ${
                      item.type === 'Fulltime'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}
                  >
                    {item.type}
                  </Badge>
                </td>

                <td className="py-3.5 px-5 text-gray-600">{item.startDate}</td>
                <td className="py-3.5 px-5 text-gray-600">{item.endDate}</td>

                <td className="py-3.5 px-5">
                  {item.status === 'active' ? (
                    <span className="inline-flex items-center gap-1.5 text-emerald-600 font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      Hoạt động
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-gray-400 font-bold">
                      <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                      Đang nghỉ
                    </span>
                  )}
                </td>

                <td className="py-3.5 px-5 text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer outline-none">
                      <MoreVertical className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    
                    <DropdownMenuContent align="end" className="w-48 rounded-xl">
                      <DropdownMenuItem
                        onClick={() => onOpenModal('view', item)}
                        className="cursor-pointer gap-2 text-xs font-semibold"
                      >
                        <Eye className="h-4 w-4 text-gray-500" />
                        Xem chi tiết hợp đồng
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem
                        onClick={() => onOpenModal('cancel', item)}
                        className="cursor-pointer gap-2 text-xs font-semibold text-red-600 focus:text-red-600 focus:bg-red-50"
                      >
                        <XCircle className="h-4 w-4" />
                        Hủy hợp đồng
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-3.5 border-t border-gray-100 bg-slate-50/40 flex items-center justify-between text-xs text-gray-500 font-medium">
        <span>1 - {contracts.length} trên 20 Hợp đồng</span>
        <div className="flex items-center gap-1">
          <button className="p-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 cursor-pointer text-gray-600">
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <button className="px-3 py-1 rounded-lg bg-blue-600 text-white font-bold cursor-pointer">1</button>
          <button className="px-3 py-1 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 cursor-pointer">2</button>
          <button className="px-3 py-1 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 cursor-pointer">3</button>
          <button className="p-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 cursor-pointer text-gray-600">
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContractTable;