import React from "react";

const departments = ["Tech", "Sales", "Ops", "Admin", "HR"];

export default function DepartmentDistribution() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between min-h-55">
      <h3 className="text-base font-bold text-slate-800">Phân bố theo phòng ban</h3>
      <div className="flex items-end justify-between pt-10 px-4">
        {departments.map((dept, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">{dept}</span>
          </div>
        ))}
      </div>
    </div>
  );
}