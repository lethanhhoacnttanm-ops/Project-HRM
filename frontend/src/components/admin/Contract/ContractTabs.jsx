import React from 'react';
import { Progress } from "@/components/ui/progress";

export const ContractTopCards = ({ mode, totalContract, isActiveContract, isExpired, waitingForRegis, isProbation }) => {
  const isWaiting = mode === 'create'
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white p-4 rounded-2xl border border-emerald-400 shadow-xs">
        <p className="text-xs font-bold text-gray-500">Tổng số hợp đồng</p>
        <h3 className="text-2xl font-black text-gray-900 mt-1">{totalContract}</h3>
        <p className="text-[11px] text-emerald-600 font-bold mt-2">Đang duy trì hoạt động: {isActiveContract}</p>
      </div>

      <div className="bg-white p-4 rounded-2xl border-2 border-red-400 shadow-xs">
        <p className="text-xs font-bold text-gray-500">Sắp hết hạn</p>
        <h3 className="text-2xl font-black text-gray-900 mt-1">{isExpired}</h3>
        <p className="text-[11px] text-red-500 font-bold mt-2">Khẩn cấp tái ký: {isExpired}</p>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-orange-400 shadow-xs">
        <p className="text-gray-500 font-bold text-xs">Chờ ký :</p>
        <h3 className="text-gray-900 text-2xl font-black mt-1">{waitingForRegis}</h3>
        <p className="text-[11px] text-orange-500 font-bold mt-2">Cần chuẩn bị kỹ thông tin</p>
      </div>

      <div className="bg-white p-4 rounded-2xl border-2 border-blue-400 shadow-xs">
        <p className="text-xs font-bold text-gray-500">Hợp đồng thử việc</p>
        <h3 className="text-2xl font-black text-gray-900 mt-1">{isProbation}</h3>
        <p className="text-[11px] text-blue-600 font-bold mt-2">Đang gần hạn đánh giá</p>
      </div>
    </div>
  );
};

export const ContractBottomCards = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
      <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-red-400 inline-block"></span>
          <h3 className="text-xl font-extrabold text-gray-800">Cần gia hạn gấp</h3>
        </div>

        <div className="space-y-3 pt-1">
          <div className="border-l-4 border-red-500 pl-3 py-1">
            <h4 className="font-bold text-gray-800 text-sm">Web site bất động sản - #HĐ-1222</h4>
            <p className="text-xs text-red-500 font-semibold">Hành động gấp trước - 29/07/2026</p>
          </div>

          <div className="border-l-4 border-red-500 pl-3 py-1">
            <h4 className="font-bold text-gray-800 text-sm">Landing Page nội thất - #HĐ-1222</h4>
            <p className="text-xs text-red-500 font-semibold">Hành động gấp trước - 29/07/2026</p>
          </div>
        </div>
      </div>

      <div className="bg-indigo-50/60 p-5 rounded-3xl border border-indigo-100 shadow-xs space-y-4">
        <div>
          <h3 className="text-xl font-extrabold text-gray-900">Tình trạng tuân thủ pháp luật</h3>
          <p className="text-xs text-gray-500 font-medium mt-0.5">Lần xác minh cuối cùng : 29/07/2026</p>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs font-bold mb-1.5">
              <span className="text-gray-700">Luật lao động địa phương</span>
              <span className="text-indigo-600">98% Yêu cầu</span>
            </div>
            <Progress
              value={98}
              className="h-2.5 bg-purple-200 [&>div]:bg-purple-600"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold mb-1.5">
              <span className="text-gray-700">Luật lao động địa phương</span>
              <span className="text-emerald-600">80% Yêu cầu</span>
            </div>
            <Progress
              value={80}
              className="h-2.5 bg-slate-200 [&>div]:bg-emerald-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};