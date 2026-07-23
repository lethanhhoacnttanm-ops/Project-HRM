import React from 'react';
import { Select } from 'antd';

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
      <div className="flex items-center justify-between  bg-violet-50! p-3 pr-5 pl-5 rounded-t-2xl">
        <h2 className="text-xl font-bold text-gray-800">Tuyển dụng</h2>
        <div className="flex items-center gap-3">
          <Select
            defaultValue="Thiết kế"
            className="w-36"
            options={[
              { value: 'Thiết kế', label: 'Thiết kế' },
              { value: 'Kỹ thuật', label: 'Kỹ thuật' },
              { value: 'Kế toán', label: 'Kế toán' },
            ]}
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer">
            Xem tất cả &gt;
          </button>
        </div>
      </div>

      <div className="overflow-x-auto p-5">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="text-gray-500  border-gray-100 pb-2">
              <th className="py-2.5 font-bold w-28">Đầu việc</th>
              <th className="py-2.5 font-bold text-center">Ứng tuyển mới</th>
              <th className="py-2.5 font-bold text-center">Sàng lọc</th>
              <th className="py-2.5 font-bold text-center">Phỏng vấn</th>
              <th className="py-2.5 font-bold text-center">Kiểm tra</th>
              <th className="py-2.5 font-bold text-center">Đã tuyển</th>
            </tr>
          </thead>
          <tbody >
            {recruitmentData.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50/50">
                <td className="py-2.5 font-bold text-gray-800">{row.job}</td>
                <td className="py-2.5 px-1 text-center">
                  {row.newApp && (
                    <div className={`py-3 px-1 rounded-lg text-[11px] font-semibold text-gray-800 ${idx % 2 === 0 ? 'bg-fuchsia-200' : idx === 1 ? 'bg-yellow-200' : idx === 3 ? 'bg-purple-300' : idx === 4 ? 'bg-orange-200' : 'bg-indigo-300'}`}>
                      {row.newApp}
                    </div>
                  )}
                </td>
                <td className="py-2.5 px-1 text-center">
                  {row.screening && (
                    <div className={`py-3 px-1 rounded-lg text-[11px] font-semibold text-gray-800 ${idx === 2 ? 'bg-cyan-300' : idx === 3 ? 'bg-purple-300' : 'bg-fuchsia-200'}`}>
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