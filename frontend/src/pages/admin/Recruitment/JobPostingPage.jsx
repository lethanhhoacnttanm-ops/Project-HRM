import React, { useState } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import RecruitmentStats from '../../../components/admin/job-posting/RecruitmentStats';
import JobFilter from '../../../components/admin/job-posting/JobFilter';
import JobCardList from '../../../components/admin/job-posting/JobCardList';
import RecruitmentTips from '../../../components/admin/job-posting/RecruitmentTips';
import JobModal from '../../../components/admin/job-posting/JobModal';

const initialJobs = [
  {
    id: 'JOB-01',
    title: 'Kỹ sư sản phẩm cấp cao',
    department: 'Business Analyst',
    location: 'Từ xa',
    type: 'Toàn thời gian',
    salary: '10.000 - 15.000',
    candidateCount: 12,
    requirements: ['Có hơn 5 năm kinh nghiệm lập trình React/Node.js', 'Có kinh nghiệm lãnh đạo các nhóm Agile.'],
  },
  {
    id: 'JOB-02',
    title: 'Trưởng nhóm thiết kế UI/UX',
    department: 'Thiết kế',
    location: 'Từ xa',
    type: 'Toàn thời gian',
    salary: '10.000 - 15.000',
    candidateCount: 8,
    requirements: ['Có hơn 5 năm kinh nghiệm thiết kế UI/UX', 'Có kinh nghiệm lãnh đạo các nhóm Agile.'],
  },
  {
    id: 'JOB-03',
    title: 'Kỹ sư sản phẩm cấp cao',
    department: 'Business Analyst',
    location: 'Từ xa',
    type: 'Toàn thời gian',
    salary: '10.000 - 15.000',
    candidateCount: 5,
    requirements: ['Có hơn 5 năm kinh nghiệm lập trình React/Node.js', 'Có kinh nghiệm lãnh đạo các nhóm Agile.'],
  },
];

const JobPostingPage = () => {
  const [jobs] = useState(initialJobs);
  const [searchTerm, setSearchTerm] = useState('');
  const [department, setDepartment] = useState('all');
  const [contractType, setContractType] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredJobs = jobs.filter((j) => {
    const matchSearch = j.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDept = department === 'all' || j.department === department;
    const matchType = contractType === 'all' || j.type === contractType;
    return matchSearch && matchDept && matchType;
  });

  return (
    <div className="space-y-6 p-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Quản lý tuyển dụng</h1>
          <p className="text-xs text-gray-500 font-medium mt-1 max-w-2xl">
            Hãy định hình con đường sự nghiệp của bạn trong công ty. Khám phá những cơ hội mới, giới thiệu những đồng nghiệp tài năng hoặc theo dõi quá trình ứng tuyển của bạn.
          </p>
        </div>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 h-10 px-5 rounded-xl font-bold border-none shadow-2xs cursor-pointer"
        >
          Tạo bài đăng
        </Button>
      </div>

      <RecruitmentStats />

      <JobFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        department={department}
        setDepartment={setDepartment}
        contractType={contractType}
        setContractType={setContractType}
      />

      <JobCardList jobs={filteredJobs} />

      <RecruitmentTips />

      <JobModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default JobPostingPage;