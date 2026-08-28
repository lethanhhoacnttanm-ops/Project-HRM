import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const RecruitmentStats = () => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-3 bg-white dark:bg-gray-900 p-5 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-2xs flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400">Tổng đơn đăng ký</h3>
          <p className="text-4xl font-black text-gray-900 dark:text-white mt-2">20</p>
        </div>
        <div className="mt-4">
          <span className="inline-block bg-green-100 dark:bg-green-950/80 text-emerald-700 dark:text-emerald-300 text-xs font-bold px-3 py-1.5 rounded-xl border border-green-200 dark:border-green-900/50">
            12 Đơn cho tháng này
          </span>
        </div>
      </div>

      <div className="lg:col-span-9 bg-white dark:bg-gray-900 p-5 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-2xs space-y-4">
        <div className='flex flex-row justify-between'>
          <h3 className="text-base font-extrabold text-gray-800 dark:text-white">Quy trình ứng dụng</h3>
          <Button
            onClick={() => navigate('/admin-page/approval')}
            className="rounded-xl bg-white dark:bg-gray-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white border-none! text-blue-600 dark:text-blue-400 font-bold cursor-pointer transition-colors"
          >
            Duyệt danh sách nhân sự
          </Button>
        </div>
        <div className="flex items-center justify-around text-center pt-2">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-purple-300 dark:bg-purple-900/60 flex items-center justify-center text-white font-extrabold text-lg mb-2 shadow-xs border border-purple-200 dark:border-purple-800">
              20
            </div>
            <p className="text-xs font-medium text-slate-500 dark:text-gray-400">Dự án đang mở</p>
          </div>

          <div className="h-0.5 w-12 bg-gray-200 dark:bg-gray-700 hidden sm:block"></div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-green-300 dark:bg-green-900/60 flex items-center justify-center text-white font-extrabold text-lg mb-2 shadow-xs border border-green-200 dark:border-green-800">
              10
            </div>
            <p className="text-xs font-medium text-slate-500 dark:text-gray-400">Tổng đơn đăng ký</p>
          </div>

          <div className="h-0.5 w-12 bg-gray-200 dark:bg-gray-700 hidden sm:block"></div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-blue-300 dark:bg-blue-900/60 flex items-center justify-center text-white font-extrabold text-lg mb-2 shadow-xs border border-blue-200 dark:border-blue-800">
              06
            </div>
            <p className="text-xs font-medium text-slate-500 dark:text-gray-400">Vị trí đã phân bổ</p>
          </div>

          <div className="h-0.5 w-12 bg-gray-200 dark:bg-gray-700 hidden sm:block"></div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-pink-300 dark:bg-pink-900/60 flex items-center justify-center text-white font-extrabold text-lg mb-2 shadow-xs border border-pink-200 dark:border-pink-800">
              02
            </div>
            <p className="text-xs font-medium text-slate-500 dark:text-gray-400">Đang chờ xét duyệt</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentStats;