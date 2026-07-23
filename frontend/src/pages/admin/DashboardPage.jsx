import React from 'react';
import RecruitmentCard from '../../components/admin/Dashboard/RecruitmentCard.jsx';
import MyTaskListCard from '../../components/admin/Dashboard/MyTaskListCard.jsx';
import TaskSummaryChartCard from '../../components/admin/Dashboard/TaskSummaryChartCard.jsx';
import DepartmentHRCard from '../../components/admin/Dashboard/DepartmentHRCard.jsx';

const DashboardPage = () => {
  return (
    <div className="space-y-6 p-2">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Bảng điều khiển</h1>
        <p className="text-gray-500 text-sm mt-1 font-medium">
          Màn hình chính hiển thị thông số Tuyển dụng, Các nhiệm vụ và tổ hợp phòng ban nhân sự.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <div className="lg:col-span-8 space-y-6">
          <RecruitmentCard />
          <MyTaskListCard />
        </div>

        <div className="lg:col-span-4 space-y-6">
          <TaskSummaryChartCard />
          <DepartmentHRCard />
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;