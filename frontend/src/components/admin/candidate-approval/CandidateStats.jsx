import React from 'react';

const CandidateStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs">
        <p className="text-xs font-bold text-gray-500">Tổng ứng viên ứng tuyển</p>
        <h3 className="text-2xl font-black text-gray-900 mt-1">128</h3>
        <p className="text-[11px] text-emerald-600 font-bold mt-2">+15 ứng viên tuần này</p>
      </div>

      <div className="bg-white p-4 rounded-2xl border-2 border-orange-300 shadow-2xs">
        <p className="text-xs font-bold text-gray-500">Chờ duyệt CV</p>
        <h3 className="text-2xl font-black text-gray-900 mt-1">24</h3>
        <p className="text-[11px] text-orange-500 font-bold mt-2">Cần xử lý gấp &gt; 8</p>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-indigo-200 shadow-2xs">
        <p className="text-xs font-bold text-gray-500">Lịch phỏng vấn hôm nay</p>
        <h3 className="text-2xl font-black text-gray-900 mt-1">6</h3>
        <p className="text-[11px] text-blue-600 font-bold mt-2">3 ca phỏng vấn online</p>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs">
        <p className="text-xs font-bold text-gray-500">Đã tuyển thành công (Offer)</p>
        <h3 className="text-2xl font-black text-gray-900 mt-1">12</h3>
        <p className="text-[11px] text-emerald-600 font-bold mt-2">Đạt 80% chỉ tiêu tháng</p>
      </div>
    </div>
  );
};

export default CandidateStats;