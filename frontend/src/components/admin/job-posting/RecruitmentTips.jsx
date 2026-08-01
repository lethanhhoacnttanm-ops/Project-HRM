import React from 'react';
import { Button } from '@/components/ui/button';

const RecruitmentTips = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
      <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-gray-100 shadow-2xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center text-green-700 font-bold text-lg">
            💡
          </div>
          <div>
            <h3 className="text-lg font-black text-gray-800">Chuẩn bị cho các cuộc phỏng vấn nội bộ</h3>
            <p className="text-xs text-gray-500 font-medium">Nổi bật giữa đám đông với cẩm nang ứng viên nội bộ của chúng tôi.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-2xl border border-gray-100 bg-slate-50/40 space-y-1">
            <h4 className="font-bold text-indigo-600 text-xs">Mẹo 1: Suy ngẫm về sự phát triển</h4>
            <p className="text-[11px] text-gray-500">Hãy trình bày chi tiết cách vai trò hiện tại đã chuẩn bị cho bạn đối mặt với thử thách mới.</p>
          </div>
          <div className="p-4 rounded-2xl border border-gray-100 bg-slate-50/40 space-y-1">
            <h4 className="font-bold text-indigo-600 text-xs">Mẹo 2: Kết nối mạng nội bộ</h4>
            <p className="text-[11px] text-gray-500">Hãy kết nối với các thành viên trong nhóm mà bạn đang ứng tuyển.</p>
          </div>
        </div>
      </div>

      {/* Khối bên phải: Huấn luyện nghề nghiệp */}
      <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-2xs flex flex-col items-center text-center justify-between space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-purple-200 transform rotate-12 flex items-center justify-center text-2xl shadow-xs">
          🎓
        </div>
        <div>
          <h3 className="text-base font-black text-gray-800">Huấn luyện nghề nghiệp</h3>
          <p className="text-xs text-gray-500 font-medium mt-1">
            Bạn đang phân vân về bước đi tiếp theo? Hãy đặt lịch tư vấn miễn phí 30 phút với chuyên viên nhân sự.
          </p>
        </div>
        <Button className="w-full rounded-xl border-indigo-600 text-indigo-600 font-bold h-10 hover:bg-indigo-50">
          Lên lịch buổi họp
        </Button>
      </div>
    </div>
  );
};

export default RecruitmentTips;