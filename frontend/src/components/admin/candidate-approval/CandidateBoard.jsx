import React from 'react';
import { Tag, Dropdown } from 'antd';
import { MoreOutlined, PhoneOutlined, MailOutlined, PaperClipOutlined } from '@ant-design/icons';

const columns = [
  { id: 'new', title: 'Hồ sơ mới', color: 'bg-purple-100 text-purple-700' },
  { id: 'interview', title: 'Phỏng vấn', color: 'bg-blue-100 text-blue-700' },
  { id: 'evaluating', title: 'Đánh giá / Test', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'offered', title: 'Trúng tuyển (Offer)', color: 'bg-emerald-100 text-emerald-700' },
];

const CandidateBoard = ({ candidates = [], onOpenModal }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto pb-4">
      {columns.map((col) => {
        const colCandidates = candidates.filter((c) => c.stage === col.id);

        return (
          <div key={col.id} className="bg-slate-50/70 p-3 rounded-2xl border border-gray-200 min-h-125">
            <div className="flex items-center justify-between mb-3 px-1">
              <span className={`px-3 py-1 rounded-xl text-xs font-bold ${col.color}`}>
                {col.title} ({colCandidates.length})
              </span>
            </div>

            <div className="space-y-3">
              {colCandidates.map((can) => (
                <div
                  key={can.id}
                  onClick={() => onOpenModal(can)}
                  className="bg-white p-4 rounded-xl border border-gray-100 shadow-2xs hover:shadow-md transition-all cursor-pointer space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm hover:text-indigo-600 transition-colors">
                        {can.name}
                      </h4>
                      <p className="text-xs text-indigo-600 font-semibold">{can.jobTitle}</p>
                    </div>

                    <Dropdown
                      menu={{
                        items: [
                          { key: 'view', label: 'Xem chi tiết CV', onClick: () => onOpenModal(can) },
                          { key: 'pass', label: 'Chuyển bước tiếp theo' },
                          { key: 'reject', label: 'Từ chối ứng viên', danger: true },
                        ],
                      }}
                      trigger={['click']}
                    >
                      <button className="text-gray-400 hover:text-gray-600 p-1" onClick={(e) => e.stopPropagation()}>
                        <MoreOutlined />
                      </button>
                    </Dropdown>
                  </div>

                  <div className="text-[11px] text-gray-400 space-y-1">
                    <p className="flex items-center gap-1.5"><MailOutlined /> {can.email}</p>
                    <p className="flex items-center gap-1.5"><PhoneOutlined /> {can.phone}</p>
                  </div>

                  <div className="pt-2 border-t border-gray-50 flex items-center justify-between text-xs">
                    <span className="text-[10px] text-gray-400 font-medium">Nộp: {can.appliedDate}</span>
                    <Tag color="blue" className="rounded-md text-[10px]">
                      <PaperClipOutlined /> CV
                    </Tag>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CandidateBoard;