import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "T4", newHires: 18, departures: 5 },
  { month: "T5", newHires: 24, departures: 8 },
  { month: "T6", newHires: 15, departures: 4 },
  { month: "T7", newHires: 30, departures: 6 },
  { month: "T8", newHires: 22, departures: 10 },
  { month: "T9", newHires: 32, departures: 8 },
];

export default function WorkforceTrendsChart() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-800 text-sm">
          Biến động nhân sự (6 tháng)
        </h3>
        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
            <span className="text-slate-600">Tuyển mới</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-400" />
            <span className="text-slate-600">Nghỉ việc</span>
          </div>
        </div>
      </div>

      <div className="h-60 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={6}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748b" }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748b" }} />
            <Tooltip
              contentStyle={{ backgroundColor: "#1e293b", borderRadius: "12px", color: "#fff", border: "none", fontSize: "12px" }}
              itemStyle={{ color: "#fff" }}
            />
            <Bar dataKey="newHires" name="Tuyển mới" fill="#4f46e5" radius={[6, 6, 0, 0]} barSize={16} />
            <Bar dataKey="departures" name="Nghỉ việc" fill="#2dd4bf" radius={[6, 6, 0, 0]} barSize={16} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}