import React from "react";

const departments = ["Tech", "Sales", "Ops", "Admin", "HR"];

export default function DepartmentDistribution() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between min-h-55 dark:bg-gray-900 dark:border-gray-800 shadow-sm">
      <h3 className="text-base font-bold text-slate-800 dark:text-white">Phân bố theo phòng ban</h3>

      <div className="flex items-end justify-between pt-10 px-4 gap-4">
        {departments.map((dept, index) => (
          <div key={index} className="flex flex-col items-center gap-2 flex-1">
            <div className="w-full max-w-8 h-24 bg-indigo-50 dark:bg-gray-800 rounded-t-xl overflow-hidden flex items-end">
              <div
                className="w-full bg-indigo-600 dark:bg-indigo-500 rounded-t-xl transition-all duration-500"
                style={{ height: `${dept.percentage || 60}%` }}
              ></div>
            </div>

            <span className="text-xs font-semibold text-slate-500 dark:text-gray-400 text-center truncate w-full">
              {typeof dept === 'object' ? dept.name : dept}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}