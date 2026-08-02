import React from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const topEmployees = [
  {
    id: 1,
    name: "Marcus T.",
    role: "DevOps Lead",
    score: "4.9",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    name: "Elena K.",
    role: "HR Ops",
    score: "4.8",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    name: "David R.",
    role: "Sales Director",
    score: "4.8",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
  },
];

export default function TopEmployeesWidget() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-800 text-sm">Nhân sự xuất sắc</h3>
        <button className="text-xs font-bold text-indigo-600 hover:text-indigo-800">
          Xem tất cả
        </button>
      </div>

      <div className="space-y-3">
        {topEmployees.map((emp) => (
          <div key={emp.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={emp.avatar}
                alt={emp.name}
                className="w-8 h-8 rounded-full object-cover border"
              />
              <div>
                <p className="font-bold text-slate-800 text-xs">{emp.name}</p>
                <p className="text-[10px] text-slate-400">{emp.role}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="font-bold text-emerald-600 text-xs">{emp.score}</span>
              <div className="flex gap-0.5 mt-0.5">
                <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
                <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
                <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        className="w-full border-indigo-100 text-indigo-600 hover:bg-indigo-50 font-semibold text-xs h-9 rounded-xl shadow-none flex items-center justify-center gap-2 mt-2"
      >
        <Download className="w-3.5 h-3.5" />
        <span>Xuất danh sách</span>
      </Button>
    </div>
  );
}