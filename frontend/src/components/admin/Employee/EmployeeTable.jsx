import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { MoreVertical, User, Edit, ExternalLink } from "lucide-react";

const EmployeeTable = ({ employees, onOpenModal }) => {

  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl border border-gray-300 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-violet-50 border-b border-gray-100 text-gray-700 font-bold">
              <th className="py-3.5 px-6">Tên</th>
              <th className="py-3.5 px-6">Vị trí</th>
              <th className="py-3.5 px-6">Phòng ban</th>
              <th className="py-3.5 px-6">Trạng thái</th>
              <th className="py-3.5 px-6 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {employees.map((emp) => (
              <tr key={emp._id || emp.id} className="hover:bg-slate-50/40 transition-colors">
                <td className="py-3.5 px-6">
                  <div
                    onClick={() => navigate(`/admin-page/employees/${emp.id}`)}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <div className="w-9 h-9 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 group-hover:border-blue-500 transition-colors">
                      <User />
                    </div>
                    <div>
                      <div className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                        {emp.name}
                      </div>
                      <div className="text-xs text-gray-400">{emp.email}</div>
                    </div>
                  </div>
                </td>

                <td className="py-3.5 px-6 font-medium text-gray-600">{emp.position || 'Cộng tác'}</td>

                <td className="py-3.5 px-6">
                  <span className="inline-block bg-indigo-50 text-indigo-600 text-xs font-semibold px-3 py-1 rounded-xl border border-indigo-100">
                    {emp.department || 'Fullstack Developer'}
                  </span>
                </td>

                <td className="py-3.5 px-6">
                  {emp.status === 'active' ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      Hoạt động
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400">
                      <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                      Đang nghỉ
                    </span>
                  )}
                </td>

                <td className="py-3.5 px-6 text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer outline-none">
                      <MoreVertical className="h-5 w-5" />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-52 rounded-xl">
                      <DropdownMenuItem
                        onClick={() => onOpenModal('view', emp)}
                        className="cursor-pointer gap-2"
                      >
                        <User className="h-4 w-4 text-gray-500" />
                        Xem chi tiết
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => navigate(`/admin-page/employees/${emp.id}`)}
                        className="cursor-pointer gap-2 text-slate-700 focus:text-slate-900"
                      >
                        <ExternalLink className="h-4 w-4 text-slate-500" />
                        Đến trang hồ sơ đầy đủ
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem
                        onClick={() => onOpenModal('edit', emp)}
                        className="cursor-pointer gap-2"
                      >
                        <Edit className="h-4 w-4 text-blue-500" />
                        Chỉnh sửa thông tin
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-gray-100 bg-slate-50/30 flex items-center justify-between text-xs text-gray-500">
        <span>1 - {employees.length} trên 300 nhân sự</span>
        <div className="flex items-center gap-1">
          <Button className="px-2.5 py-1 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 cursor-pointer">
            &lt;
          </Button>
          <Button className="px-3 py-1 rounded-lg bg-blue-600 text-white font-bold cursor-pointer">1</Button>
          <Button className="px-3 py-1 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 cursor-pointer">2</Button>
          <Button className="px-3 py-1 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 cursor-pointer">3</Button>
          <Button className="px-2.5 py-1 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 cursor-pointer">
            &gt;
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTable;