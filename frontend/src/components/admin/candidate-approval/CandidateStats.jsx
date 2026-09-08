import React from 'react';

const CandidateStats = ({ statsData }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-2xs">
        <p className="text-xs font-bold text-gray-500 dark:text-gray-400">Tổng ứng viên ứng tuyển</p>
        <h3 className="text-2xl font-black text-gray-900 dark:text-white mt-1">
          {statsData?.totalCandidates ?? 0}
        </h3>
        <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold mt-2">
          +{statsData?.newThisWeek ?? 0} ứng viên tuần này
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border-2 border-orange-300 dark:border-orange-700/60 shadow-2xs">
        <p className="text-xs font-bold text-gray-500 dark:text-gray-400">Chờ duyệt CV</p>
        <h3 className="text-2xl font-black text-gray-900 dark:text-white mt-1">
          {statsData?.pendingReview ?? 0}
        </h3>
        <p className="text-[11px] text-orange-500 dark:text-orange-400 font-bold mt-2">
          Hồ sơ mới cần xử lý
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-indigo-200 dark:border-indigo-900/60 shadow-2xs">
        <p className="text-xs font-bold text-gray-500 dark:text-gray-400">Lịch phỏng vấn</p>
        <h3 className="text-2xl font-black text-gray-900 dark:text-white mt-1">
          {statsData?.todayInterview ?? 0}
        </h3>
        <p className="text-[11px] text-blue-600 dark:text-blue-400 font-bold mt-2">
          Đang trong giai đoạn phỏng vấn
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-2xs">
        <p className="text-xs font-bold text-gray-500 dark:text-gray-400">Đã tuyển thành công (Offer)</p>
        <h3 className="text-2xl font-black text-gray-900 dark:text-white mt-1">
          {statsData?.offeredCount ?? 0}
        </h3>
        <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold mt-2">
          Ứng viên đã nhận Offer
        </p>
      </div>
    </div>
  );
};

export default CandidateStats;