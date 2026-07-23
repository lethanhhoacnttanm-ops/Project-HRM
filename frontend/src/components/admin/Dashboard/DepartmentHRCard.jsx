import React from 'react';
import { Avatar, Tooltip } from 'antd';

const hrDepartments = [
  { title: 'Nhân sự', subtitle: 'Tổng nhân sự', count: 3 },
  { title: 'Nhân sự', subtitle: 'Tổng nhân sự', count: 3 },
  { title: 'Nhân sự', subtitle: 'Tổng nhân sự', count: 3 },
];

const DepartmentHRCard = () => {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Nhân sự</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer">
          Xem tất cả &gt;
        </button>
      </div>

      <div className="space-y-3 items-center">
        {hrDepartments.map((dept, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl">
            <div>
              <h3 className="text-sm font-bold text-gray-800">{dept.title}</h3>
              <p className="text-[11px] text-gray-400 font-medium">{dept.subtitle}</p>
            </div>
            
            <Avatar.Group max={{ count: 3 }} size="small">
              <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
              <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka" />
              <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mark" />
              <Tooltip title="Nhiều hơn">
                <Avatar style={{ backgroundColor: '#818cf8' }}>+{dept.count}</Avatar>
              </Tooltip>
            </Avatar.Group>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentHRCard;