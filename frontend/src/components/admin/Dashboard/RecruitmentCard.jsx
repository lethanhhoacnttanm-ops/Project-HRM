import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const recruitmentData = [
  { job: 'Kiểm thử Website', newApp: '18 ứng viên', screening: '8 ứng viên', interview: '2 ứng viên', test: '', hired: '' },
  { job: 'Thiết kế 3D', newApp: '10 ứng viên', screening: '2 ứng viên', interview: '', test: '', hired: '' },
  { job: 'Kế toán', newApp: '24 ứng viên', screening: '14 ứng viên', interview: '2 ứng viên', test: '1 ứng viên', hired: '' },
  { job: 'Chăm sóc khách hàng', newApp: '12 ứng viên', screening: '2 ứng viên', interview: '', test: '', hired: '' },
  { job: 'Phân tích dữ liệu', newApp: '8 ứng viên', screening: '', interview: '', test: '', hired: '' },
  { job: 'Duy trì hệ thống', newApp: '5 ứng viên', screening: '2 ứng viên', interview: '', test: '', hired: '' },
];

const RecruitmentCard = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-xs">
      <div className="flex items-center justify-between bg-violet-50 p-3 px-5 rounded-t-2xl border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-800">Tuyển dụng</h2>
        
        <div className="flex items-center gap-3">
          <Select defaultValue="Thiết kế">
            <SelectTrigger className="w-36 h-9 text-xs rounded-lg border-gray-200 bg-white">
              <SelectValue placeholder="Thiết kế" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="Thiết kế" className="text-xs">Thiết kế</SelectItem>
              <SelectItem value="Kỹ thuật" className="text-xs">Kỹ thuật</SelectItem>
              <SelectItem value="Kế toán" className="text-xs">Kế toán</SelectItem>
            </SelectContent>
          </Select>

          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 h-9 rounded-lg gap-1 cursor-pointer"
          >
            Xem tất cả
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto p-5">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="text-gray-500 border-b border-gray-100 pb-2">
              <th className="py-2.5 font-bold w-28">Đầu việc</th>
              <th className="py-2.5 font-bold text-center">Ứng tuyển mới</th>
              <th className="py-2.5 font-bold text-center">Sàng lọc</th>
              <th className="py-2.5 font-bold text-center">Phỏng vấn</th>
              <th className="py-2.5 font-bold text-center">Kiểm tra</th>
              <th className="py-2.5 font-bold text-center">Đã tuyển</th>
            </tr>
          </thead>
          <tbody>
            {recruitmentData.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50/50">
                <td className="py-2.5 font-bold text-gray-800">{row.job}</td>
                
                <td className="py-2.5 px-1 text-center">
                  {row.newApp && (
                    <div className={`py-3 px-1 rounded-lg text-[11px] font-semibold text-gray-800 ${
                      idx % 2 === 0 
                        ? 'bg-fuchsia-200' 
                        : idx === 1 
                        ? 'bg-yellow-200' 
                        : idx === 3 
                        ? 'bg-purple-300' 
                        : idx === 4 
                        ? 'bg-orange-200' 
                        : 'bg-indigo-300'
                    }`}>
                      {row.newApp}
                    </div>
                  )}
                </td>

                <td className="py-2.5 px-1 text-center">
                  {row.screening && (
                    <div className={`py-3 px-1 rounded-lg text-[11px] font-semibold text-gray-800 ${
                      idx === 2 
                        ? 'bg-cyan-300' 
                        : idx === 3 
                        ? 'bg-purple-300' 
                        : 'bg-fuchsia-200'
                    }`}>
                      {row.screening}
                    </div>
                  )}
                </td>

                <td className="py-2.5 px-1 text-center">
                  {row.interview && (
                    <div className="bg-fuchsia-200 py-3 px-1 rounded-lg text-[11px] font-semibold text-gray-800">
                      {row.interview}
                    </div>
                  )}
                </td>

                <td className="py-2.5 px-1 text-center">
                  {row.test && (
                    <div className="bg-cyan-300 py-3 px-1 rounded-lg text-[11px] font-semibold text-gray-800">
                      {row.test}
                    </div>
                  )}
                </td>

                <td className="py-2.5 px-1 text-center">
                  {row.hired && (
                    <div className="bg-green-200 py-3 px-1 rounded-lg text-[11px] font-semibold text-gray-800">
                      {row.hired}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecruitmentCard;