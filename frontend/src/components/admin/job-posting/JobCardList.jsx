import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Tag } from 'antd';
import { FileMarkdownOutlined, EnvironmentOutlined, ClockCircleOutlined, DollarOutlined, ArrowRightOutlined } from '@ant-design/icons';

const JobCardList = ({ jobs = [] }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.map((job) => (
        <div
          key={job.id}
          className="bg-white p-5 rounded-3xl border border-gray-100 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <Tag color={job.department === 'Business Analyst' ? 'cyan' : 'purple'} className="rounded-md font-bold px-2.5 py-0.5 text-xs">
                {job.department}
              </Tag>
              <button className="text-gray-400 hover:text-indigo-600 cursor-pointer">
                <FileMarkdownOutlined className="text-lg" />
              </button>
            </div>

            <h3 className="text-lg font-black text-gray-800 tracking-tight mb-2">{job.title}</h3>

            <div className="flex flex-wrap gap-3 text-[11px] text-gray-500 font-medium">
              <span className="flex items-center gap-1"><EnvironmentOutlined /> {job.location}</span>
              <span className="flex items-center gap-1"><ClockCircleOutlined /> {job.type}</span>
              <span className="flex items-center gap-1"><DollarOutlined /> {job.salary}</span>
            </div>

            <div className="mt-4 space-y-1">
              <p className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Yêu cầu chính</p>
              <ul className="text-xs text-gray-500 list-disc list-inside space-y-0.5">
                {job.requirements?.map((req, idx) => (
                  <li key={idx} className="truncate">{req}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
            <Button
              type="primary"
              icon={<ArrowRightOutlined />}
              onClick={() => navigate(`/admin-page/candidate-approval?jobId=${job.id}`)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold border-none h-9 flex-1"
            >
              Duyệt CV ({job.candidateCount || 0})
            </Button>

            <Button className="rounded-xl text-xs font-bold border-gray-200 text-gray-600 h-9">
              Refer
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobCardList;