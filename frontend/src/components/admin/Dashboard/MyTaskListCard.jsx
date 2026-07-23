import React from 'react';
import { Select, DatePicker } from 'antd';
import { ClockCircleOutlined, CheckCircleOutlined, PlusOutlined } from '@ant-design/icons';

const myTasks = [
  { time: '8 giờ sáng - 10 giờ sáng', content: 'Hoàn thành công việc tuyển dụng sớm nhất' },
  { time: '10 giờ - 12 giờ', content: 'Hoàn thành công việc tuyển dụng sớm nhất' },
  { time: '10 giờ - 12 giờ', content: 'Hoàn thành công việc tuyển dụng sớm nhất' },
  { time: '10 giờ - 12 giờ', content: 'Hoàn thành công việc tuyển dụng sớm nhất' },
  { time: '10 giờ - 12 giờ', content: 'Hoàn thành công việc tuyển dụng sớm nhất' },
  { time: '10 giờ - 12 giờ', content: 'Hoàn thành công việc tuyển dụng sớm nhất' },
];

const MyTaskListCard = () => {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Công việc của tôi</h2>
        <div className="flex items-center gap-3">
          <Select
            defaultValue="Hôm nay"
            className="w-28"
            options={[{ value: 'Hôm nay', label: 'Hôm nay' }, { value: 'Tuần này', label: 'Tuần này' }]}
          />
          <DatePicker.RangePicker className="rounded-lg text-xs" />
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer">
            <PlusOutlined /> Thêm việc
          </button>
        </div>
      </div>

      <div className="space-y-2.5">
        {myTasks.map((task, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:border-gray-200 transition-colors">
            <div className="flex items-center gap-3 text-xs text-gray-600">
              <ClockCircleOutlined className="text-gray-400 text-sm" />
              <span className="font-semibold text-gray-700 w-36">{task.time}</span>
              <span className="text-gray-600">{task.content}</span>
            </div>
            <CheckCircleOutlined className="text-gray-400 hover:text-green-500 text-base cursor-pointer transition-colors" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTaskListCard;