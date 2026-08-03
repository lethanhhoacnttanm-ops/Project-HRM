import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { ShieldCheck } from "lucide-react";

const data = [
  { name: "Score", value: 92, color: "#4f46e5" }, 
  { name: "Remaining", value: 8, color: "#e2e8f0" }, 
];

export default function SecurityHealthCard() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between h-full">
      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 text-center">
        ĐIỂM SỨC KHỎE BẢO MẬT
      </h3>

      <div className="relative h-40 w-full flex items-center justify-center my-2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={52}
              outerRadius={68}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
          <span className="text-3xl font-black text-indigo-950">92</span>
          <span className="text-[11px] font-semibold text-slate-400">trên 100</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 pt-2 border-t border-slate-100">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span className="text-xs font-bold text-emerald-600">
          Hệ thống đang ở trạng thái Rất An toàn
        </span>
      </div>
    </div>
  );
}