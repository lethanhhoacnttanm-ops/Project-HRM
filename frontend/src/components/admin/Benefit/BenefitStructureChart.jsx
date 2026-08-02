import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Bảo hiểm", value: 45, color: "#3b82f6" },   
  { name: "Phụ cấp", value: 25, color: "#10b981" },    
  { name: "Khác", value: 30, color: "#475569" },       
];

export default function BenefitStructureChart() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
      <h3 className="font-bold text-slate-800 text-sm">Cơ cấu phúc lợi</h3>

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

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xl font-black text-slate-800">100%</span>
        </div>
      </div>

      <div className="space-y-2 pt-2 border-t border-slate-100">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between text-xs font-semibold">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-slate-600">{item.name}</span>
            </div>
            <span className="text-slate-800 font-bold">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}