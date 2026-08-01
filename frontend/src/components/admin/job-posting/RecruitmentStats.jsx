import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const RecruitmentStats = () => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-3 bg-white p-5 rounded-3xl border border-gray-100 shadow-2xs flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-bold text-gray-500">Tổng đơn đăng ký</h3>
          <p className="text-4xl font-black text-gray-900 mt-2">20</p>
        </div>
        <div className="mt-4">
          <span className="inline-block bg-green-100 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-xl">
            12 Đơn cho tháng này
          </span>
        </div>
      </div>

      <div className="lg:col-span-9 bg-white p-5 rounded-3xl border border-gray-100 shadow-2xs space-y-4">
        <div className='flex flex-row justify-between'>
          <h3 className="text-base font-extrabold text-gray-800">Quy trình ứng dụng</h3>
          <Button
            onClick={() => navigate('/admin-page/approval')}
            className="rounded-xl bg-white hover:bg-blue-600 hover:text-white border-none! text-blue-600 font-bold cursor-pointer"
          >
            Duyệt danh sách nhân sự
          </Button>
        </div>
        <div className="flex items-center justify-around text-center pt-2">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-purple-300 flex items-center justify-center text-white font-extrabold text-lg mb-2 shadow-xs">
              20
            </div>
            <span className="text-xs font-bold text-gray-700">Đơn nộp</span>
          </div>

          <div className="h-0.5 w-12 bg-gray-200 hidden sm:block"></div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-green-300 flex items-center justify-center text-white font-extrabold text-lg mb-2 shadow-xs">
              10
            </div>
            <span className="text-xs font-bold text-gray-700">Phỏng vấn</span>
          </div>

          <div className="h-0.5 w-12 bg-gray-200 hidden sm:block"></div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-blue-300 flex items-center justify-center text-white font-extrabold text-lg mb-2 shadow-xs">
              06
            </div>
            <span className="text-xs font-bold text-gray-700">Đánh giá</span>
          </div>

          <div className="h-0.5 w-12 bg-gray-200 hidden sm:block"></div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-pink-300 flex items-center justify-center text-white font-extrabold text-lg mb-2 shadow-xs">
              02
            </div>
            <span className="text-xs font-bold text-gray-700">Đã thuê</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentStats;