import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Eng", label: "Eng: 35%", value: 35, color: "#3b82f6" },   
  { name: "Sales", label: "Sales: 25%", value: 25, color: "#10b981" }, 
  { name: "HR", label: "HR: 20%", value: 20, color: "#22d3ee" },     
  { name: "Mkt", label: "Mkt: 15%", value: 15, color: "#334155" },    
];

export default function EmployeeStructureChart() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
      <h3 className="font-bold text-slate-800 text-sm">Cơ cấu nhân sự</h3>

      <div className="relative h-44 w-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={75}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Tổng</span>
          <span className="text-base font-black text-slate-800">1,248</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs font-semibold">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-slate-600">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}