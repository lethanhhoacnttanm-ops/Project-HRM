import React from "react";

export default function PerformanceInsightCard() {
  return (
    <div className="bg-indigo-700 dark:bg-indigo-950 text-white rounded-2xl p-6 flex flex-col justify-between shadow-md dark:border dark:border-indigo-900/50 transition-all">
      <div>
        <h3 className="text-lg font-bold text-white">Thông tin chi tiết về hiệu suất</h3>
        <p className="text-xs text-indigo-100 dark:text-indigo-300 mt-2 leading-relaxed">
          Các nhân viên được thăng chức cho thấy tốc độ hoàn thành dự án tăng 22% trong vòng 6 tháng.
        </p>
      </div>
      <div className="mt-6">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-white">94%</span>
          <span className="text-xs text-indigo-100 dark:text-indigo-300 font-medium">Tỷ lệ giữ chân</span>
        </div>
      </div>
    </div>
  );
}