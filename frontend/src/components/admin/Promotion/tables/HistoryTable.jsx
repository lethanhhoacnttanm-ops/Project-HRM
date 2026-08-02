import React from "react";

const historyData = [
  {
    id: 1,
    name: "Jordan Miller",
    avatarBg: "bg-indigo-600 text-white",
    initials: "JM",
    previousRole: "Analyst",
    newRole: "Senior Analyst",
    effectiveDate: "Oct 12, 2023",
    approvedBy: "Sarah Connor",
    type: "Vertical",
    typeColor: "bg-teal-100 text-teal-700",
  },
  {
    id: 2,
    name: "Lisa Thompson",
    avatarBg: "bg-emerald-400 text-white",
    initials: "LT",
    previousRole: "Project Coordinator",
    newRole: "Manager",
    effectiveDate: "Sep 28, 2023",
    approvedBy: "Robert Fox",
    type: "Merit-based",
    typeColor: "bg-indigo-100 text-indigo-600",
  },
  {
    id: 3,
    name: "Alex Kim",
    avatarBg: "bg-rose-300 text-white",
    initials: "AK",
    previousRole: "UX Designer",
    newRole: "Product Designer",
    effectiveDate: "Aug 15, 2023",
    approvedBy: "Sarah Connor",
    type: "Lateral",
    typeColor: "bg-indigo-600 text-white",
  },
];

export default function HistoryTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
          <tr>
            <th className="py-3 px-6">Nhân sự</th>
            <th className="py-3 px-4">Vai trò trước đó</th>
            <th className="py-3 px-4">Vai trò mới</th>
            <th className="py-3 px-4">Ngày có hiệu lực</th>
            <th className="py-3 px-4">Được duyệt bởi</th>
            <th className="py-3 px-4">Loại</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-slate-700">
          {historyData.map((row) => (
            <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
              <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${row.avatarBg}`}>
                    {row.initials}
                  </div>
                  <span className="font-semibold text-slate-800">{row.name}</span>
                </div>
              </td>
              <td className="py-4 px-4 text-slate-600">{row.previousRole}</td>
              <td className="py-4 px-4 font-bold text-indigo-600">{row.newRole}</td>
              <td className="py-4 px-4 text-slate-600">{row.effectiveDate}</td>
              <td className="py-4 px-4 text-slate-600">{row.approvedBy}</td>
              <td className="py-4 px-4">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${row.typeColor}`}>
                  {row.type}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}