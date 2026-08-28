import React from 'react';
import { 
  Briefcase, 
  BookOpen, 
  Scale, 
  Target,
} from 'lucide-react';

export default function PersonalKPIGuidelineTab() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-600" /> Tiêu chí & Điều kiện Đánh giá Hiệu suất Cá nhân
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Khung chuẩn quy định cơ sở quan sát và định mức điểm số (Thang điểm 5.0) cho từng nhân sự.
          </p>
        </div>
        <div className="px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-semibold">
          Thang điểm chuẩn: 0 - 5 ⭐
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 text-base">1. Tham gia dự án Outsourcing</h3>
                <p className="text-xs text-slate-400">Trọng tâm: Hiệu suất chuyên môn & Bàn giao sản phẩm</p>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
              <p className="font-semibold text-slate-700">Cơ sở quan sát và điều kiện chấm điểm:</p>
              <ul className="space-y-2 pl-4 list-disc text-slate-500">
                <li><strong className="text-slate-700">Tiến độ & Khối lượng (SLA):</strong> Hoàn thành task đúng hạn trên hệ thống quản lý công việc.</li>
                <li><strong className="text-slate-700">Chất lượng mã nguồn (Code Quality):</strong> Tỷ lệ lỗi (bug) phát sinh thấp, code sạch, dễ bảo trì.</li>
                <li><strong className="text-slate-700">Mức độ đáp ứng yêu cầu khách hàng:</strong> Không bị khách hàng phàn nàn về thái độ hoặc chất lượng bàn giao.</li>
              </ul>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg text-[11px] text-slate-500 border border-slate-100 flex items-center justify-between">
            <span>Mức tối đa: <strong>5 ⭐</strong></span>
            <span className="text-blue-600 font-medium">Đóng góp trực tiếp doanh thu</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 text-base">2. Đào tạo & Phát triển nội bộ</h3>
                <p className="text-xs text-slate-400">Trọng tâm: Năng lực học tập & Xây dựng tổ chức</p>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
              <p className="font-semibold text-slate-700">Cơ sở quan sát và điều kiện chấm điểm:</p>
              <ul className="space-y-2 pl-4 list-disc text-slate-500">
                <li><strong className="text-slate-700">Tinh thần học hỏi (Continuous Learning):</strong> Chủ động cập nhật công nghệ mới, tham gia các khóa học chuyên môn.</li>
                <li><strong className="text-slate-700">Hỗ trợ nội bộ:</strong> Tích cực tham gia training, chia sẻ kiến thức cho đồng nghiệp hoặc nhân sự mới (Intern).</li>
                <li><strong className="text-slate-700">Đóng góp văn hóa:</strong> Phối hợp tốt với các phòng ban khác khi có yêu cầu chung.</li>
              </ul>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg text-[11px] text-slate-500 border border-slate-100 flex items-center justify-between">
            <span>Mức tối đa: <strong>5 ⭐</strong></span>
            <span className="text-indigo-600 font-medium">Nền tảng phát triển dài hạn</span>
          </div>
        </div>

      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm space-y-4">
        <h3 className="font-semibold text-slate-800 text-sm flex items-center gap-2">
          <Scale className="w-4 h-4 text-indigo-600" /> Quy tắc quy đổi điểm tổng kết (Overall Score) & Đánh giá
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-700 uppercase">Xuất sắc (Vượt kỳ vọng)</span>
              <span className="text-sm font-extrabold text-emerald-800">4.5 - 5.0 ⭐</span>
            </div>
            <p className="text-[11px] text-slate-600">
              Hoàn thành xuất sắc mọi dự án outsource, đồng thời rất tích cực dẫn dắt các hoạt động đào tạo nội bộ.
            </p>
          </div>

          <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-700 uppercase">Đạt kỳ vọng</span>
              <span className="text-sm font-extrabold text-blue-800">3.0 - 4.4 ⭐</span>
            </div>
            <p className="text-[11px] text-slate-600">
              Làm tròn trách nhiệm dự án outsource được giao, hoàn thành mức độ học tập và phát triển ở mức cơ bản.
            </p>
          </div>

          <div className="p-4 bg-amber-50/50 border border-amber-100 rounded-xl space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-700 uppercase">Cần cải thiện</span>
              <span className="text-sm font-extrabold text-amber-800">&lt; 3.0 ⭐</span>
            </div>
            <p className="text-[11px] text-slate-600">
              Chưa đạt tiến độ trong các dự án outsource hoặc thiếu tinh thần chủ động tham gia học tập, nâng cao kỹ năng.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}