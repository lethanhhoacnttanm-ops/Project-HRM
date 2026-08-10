import React from 'react';
import { MoreHorizontalIcon } from 'lucide-react';

const TaskSummaryChartCard = () => {
  return (
    <div className="bg-white dark:bg-black rounded-2xl border border-gray-200 dark:border-gray-900 shadow-xs">
      <div className="flex items-center justify-between  bg-violet-50 p-3 px-5 rounded-t-2xl dark:bg-gray-900">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Tóm tắt công việc</h2>
        <MoreHorizontalIcon className="text-gray-400 text-lg cursor-pointer" />
      </div>

      <div className=" p-5 flex justify-center items-center py-6 dark:bg-blue-950">
        <div className="relative w-44 h-44 flex items-center justify-center">
          <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
            <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#EAB308" strokeWidth="4" strokeDasharray="40 60" strokeDashoffset="0" />
            <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#EC4899" strokeWidth="4" strokeDasharray="20 80" strokeDashoffset="-40" />
            <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#6366F1" strokeWidth="4" strokeDasharray="18 82" strokeDashoffset="-60" />
            <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#22C55E" strokeWidth="4" strokeDasharray="22 78" strokeDashoffset="-78" />
          </svg>
        </div>
      </div>

      <div className="p-5 grid grid-cols-2 gap-3 text-xs font-semibold text-gray-700 pt-2 border-t rounded-b-2xl border-gray-50 dark:bg-gray-900">
        <div className="flex items-center gap-2 dark:text-amber-50/50">
          <span className="w-2.5 h-2.5 bg-yellow-500 rounded-xs"></span>
          <span>40 <span className="text-gray-500 font-normal dark:text-white">Đã ra mắt</span></span>
        </div>
        <div className="flex items-center gap-2 dark:text-amber-50/50">
          <span className="w-2.5 h-2.5 bg-pink-500 rounded-xs"></span>
          <span>20 <span className="text-gray-500 font-normal dark:text-white">Tạm dừng</span></span>
        </div>
        <div className="flex items-center gap-2 dark:text-amber-50/50">
          <span className="w-2.5 h-2.5 bg-indigo-500 rounded-xs"></span>
          <span>18 <span className="text-gray-500 font-normal dark:text-white">Nội bộ</span></span>
        </div>
        <div className="flex items-center gap-2 dark:text-amber-50/50">
          <span className="w-2.5 h-2.5 bg-green-500 rounded-xs"></span>
          <span>10 <span className="text-gray-500 font-normal dark:text-white">Đã hủy</span></span>
        </div>
      </div>
    </div>
  );
};

export default TaskSummaryChartCard;