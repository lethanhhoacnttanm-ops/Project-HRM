import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

import CandidateStats from '../../../components/admin/candidate-approval/CandidateStats';
import CandidateBoard from '../../../components/admin/candidate-approval/CandidateBoard';
import CandidateDetailModal from '../../../components/admin/candidate-approval/CandidateDetailModal';

const initialCandidates = [
  { id: 1, name: 'Nguyễn Văn An', jobTitle: 'Kỹ sư sản phẩm cấp cao', email: 'an.nguyen@gmail.com', phone: '0912 345 678', appliedDate: '24/07/2026', stage: 'new', stageName: 'Hồ sơ mới' },
  { id: 2, name: 'Trần Thị Bích', jobTitle: 'Trưởng nhóm thiết kế UI/UX', email: 'bich.tran@gmail.com', phone: '0987 654 321', appliedDate: '22/07/2026', stage: 'interview', stageName: 'Phỏng vấn' },
  { id: 3, name: 'Lê Hoàng Nam', jobTitle: 'Backend Developer', email: 'nam.le@gmail.com', phone: '0901 112 223', appliedDate: '20/07/2026', stage: 'evaluating', stageName: 'Đánh giá / Test' },
  { id: 4, name: 'Phạm Minh Khoa', jobTitle: 'Business Analyst', email: 'khoa.pham@gmail.com', phone: '0933 445 566', appliedDate: '18/07/2026', stage: 'offered', stageName: 'Trúng tuyển' },
];

const CandidateApprovalPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const jobId = searchParams.get('jobId');

  const [candidates] = useState(initialCandidates);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (candidate) => {
    setSelectedCandidate(candidate);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 p-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            {jobId && (
              <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-xl text-xs font-bold border border-indigo-100">
                Lọc theo mã: {jobId}
              </span>
            )}
          </div>

          <h1 className="text-3xl font-black text-gray-900 tracking-tight pt-2">
            {jobId ? `Duyệt ứng viên bài đăng ${jobId}` : 'Duyệt tất cả hồ sơ ứng viên'}
          </h1>
          <p className="text-xs text-gray-500 font-medium">
            Quản lý tiến độ tuyển dụng, đánh giá năng lực và phê duyệt các ứng viên tiềm năng.
          </p>
        </div>
      </div>

      <CandidateStats />

      <CandidateBoard candidates={candidates} onOpenModal={handleOpenModal} />

      <CandidateDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        candidate={selectedCandidate}
      />
    </div>
  );
};

export default CandidateApprovalPage;