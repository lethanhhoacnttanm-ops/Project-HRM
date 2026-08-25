import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

import CandidateStats from '../../../components/admin/candidate-approval/CandidateStats';
import CandidateBoard from '../../../components/admin/candidate-approval/CandidateBoard';
import CandidateDetailModal from '../../../components/admin/candidate-approval/CandidateDetailModal';
import candidateService from '@/services/candidate.service';
import jobService from '@/services/job.service';

const CandidateApprovalPage = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const jobId = searchParams.get('jobId');

  const [jobInfo, setJobInfo] = useState(location.state?.jobData || null);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);


  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchApprovalData = async () => {
      if (!jobId) {
        message.warning('Không tìm thấy mã dự án (jobId) trên URL!');
        return;
      }

      try {
        setLoading(true);
        const response = await jobService.getJobDetailsForApproval(jobId);
        
        // Cấu trúc response.data trả về là: { jobInfo: {...}, candidates: [...] }
        const payload = response.data || response;

        if (payload) {
          // 1. Gán thông tin job để hiển thị tiêu đề, khách hàng, ngân sách
          if (payload.jobInfo) {
            setJobInfo(payload.jobInfo);
          }
          
          // 2. Gán danh sách ứng viên vào bảng Kanban
          if (payload.candidates) {
            setCandidates(payload.candidates);
          }
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu duyệt hồ sơ:", error);
        message.error('Không thể tải thông tin trang duyệt.');
      } finally {
        setLoading(false);
      }
    };

    fetchApprovalData();
  }, [jobId]);

  const handleOpenModal = (candidate) => {
    setSelectedCandidate(candidate);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 p-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate(-1)}
              className="rounded-xl text-xs font-bold cursor-pointer"
            >
              Quay lại
            </Button>
            {jobId && (
              <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-xl text-xs font-bold border border-indigo-100">
                Mã dự án: {jobId}
              </span>
            )}
          </div>

          <h1 className="text-3xl font-black text-gray-900 tracking-tight pt-2">
            {console.log(jobInfo)}
            {jobInfo ? `Duyệt ứng viên dự án: ${jobInfo.title}` : (jobId ? `Đang tải thông tin dự án (${jobId})...` : 'Duyệt tất cả hồ sơ ứng viên')}
          </h1>
          <p className="text-xs text-gray-500 font-medium">
            {jobInfo
              ? `Khách hàng: ${jobInfo.client || 'Nội bộ'} | Ngân sách: ${jobInfo.budget}`
              : 'Quản lý tiến độ tuyển dụng, đánh giá năng lực và phê duyệt các ứng viên tiềm năng.'}
          </p>
        </div>
      </div>

      <CandidateStats candidates={candidates} />

      <CandidateBoard
        candidates={candidates}
        onOpenModal={handleOpenModal}
        loading={loading}
      />

      <CandidateDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        candidate={selectedCandidate}
      />
    </div>
  );
};

export default CandidateApprovalPage;