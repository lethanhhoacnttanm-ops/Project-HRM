import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Công nghệ thông tin", value: 45, color: "#4f46e5" },    
  { name: "Hành chính & Nhân sự", value: 32, color: "#0d9488" },  
  { name: "Lương & Phúc lợi", value: 23, color: "#334155" },       
];

export default function TicketCategoryChart() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
      <h3 className="font-bold text-slate-800 text-sm">Phân bố theo loại</h3>

      <div className="space-y-2 text-xs font-semibold">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-slate-600">{item.name}</span>
            </div>
            <span className="text-slate-800 font-bold">{item.value}%</span>
          </div>
        ))}
      </div>

      <div className="relative h-40 w-full flex items-center justify-center pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={68}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}