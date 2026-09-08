import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Kỹ thuật", value: 1.12, label: "1.12 tỷ", color: "#3b82f6" },    
  { name: "Kinh doanh", value: 0.875, label: "875tr", color: "#0d9488" },   
  { name: "Vận hành & Khác", value: 0.505, label: "505tr", color: "#475569" } 
];

export default function DepartmentCostChart() {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
      <h3 className="font-bold text-slate-800 dark:text-slate-100 text-xs tracking-wider uppercase">
        CHI PHÍ THEO PHÒNG BAN
      </h3>

      <div className="relative h-48 w-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
          <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">Tổng cộng</span>
          <span className="text-base font-black text-slate-800 dark:text-slate-100">2.5 tỷ</span>
        </div>
      </div>

      <div className="space-y-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between text-xs font-semibold">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-slate-600 dark:text-slate-400">{item.name}</span>
            </div>
            <span className="text-slate-800 dark:text-slate-200 font-bold">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}