import React from "react";

export default function PerformanceInsightCard() {
  return (
    <div className="bg-indigo-700 text-white rounded-2xl p-6 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-bold">Thông tin chi tiết về hiệu suất</h3>
        <p className="text-xs text-indigo-200 mt-2 leading-relaxed">
          Các nhân viên được thăng chức cho thấy tốc độ hoàn thành dự án tăng 22% trong vòng 6 tháng.
        </p>
      </div>
      <div className="mt-6">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-extrabold">94%</span>
          <span className="text-xs text-indigo-200 font-medium">Tỷ lệ giữ chân</span>
        </div>
      </div>
    </div>
  );
}