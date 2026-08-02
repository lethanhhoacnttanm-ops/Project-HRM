import React from "react";
import { Info, Star, Download, Filter } from "lucide-react";

const eligibilityData = [
  {
    id: 1,
    name: "Sarah Jenkins",
    email: "sarah.j@hrm.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    role: "Marketing Specialist",
    tenure: "3.2 Yrs",
    score: "4.9",
    status: "Qualified",
    statusColor: "bg-teal-100 text-teal-700",
  },
  {
    id: 2,
    name: "Thomas Wu",
    email: "thomas.w@hrm.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    role: "Senior Developer",
    tenure: "2.8 Yrs",
    score: "4.7",
    status: "Near Qualified",
    statusColor: "bg-indigo-100 text-indigo-600",
  },
];

export default function EligibilityTable() {
  return (
    <div className="space-y-4">
      <div className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-1.5 bg-indigo-100 text-indigo-600 rounded-full mt-0.5">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800">Yêu cầu tối thiểu</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Thời gian công tác &gt; 2 năm • Xếp hạng hiệu suất &gt; 4.0 • Đạt KPI &gt; 90%
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 self-end md:self-auto">
          <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
            <Filter className="w-3.5 h-3.5" />
            <span>Lọc theo phòng ban</span>
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
            <Download className="w-3.5 h-3.5" />
            <span>Danh sách xuất khẩu</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
            <tr>
              <th className="py-3 px-6">Nhân sự</th>
              <th className="py-3 px-4">Vị trí hiện tại</th>
              <th className="py-3 px-4">Số năm giữ chức</th>
              <th className="py-3 px-4">Hiệu suất</th>
              <th className="py-3 px-4">Trạng thái</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {eligibilityData.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <img src={row.avatar} alt={row.name} className="w-10 h-10 rounded-full object-cover border" />
                    <div>
                      <p className="font-semibold text-slate-800">{row.name}</p>
                      <p className="text-xs text-slate-400">{row.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 font-medium text-slate-600">{row.role}</td>
                <td className="py-4 px-4 text-slate-600">{row.tenure}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-1 font-semibold text-slate-800">
                    <Star className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                    <span>{row.score}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${row.statusColor}`}>
                    {row.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <button className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}