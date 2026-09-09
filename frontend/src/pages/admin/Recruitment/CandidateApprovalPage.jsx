import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

import CandidateStats from '../../../components/admin/candidate-approval/CandidateStats';
import CandidateBoard from '../../../components/admin/candidate-approval/CandidateBoard';
import CandidateDetailModal from '../../../components/admin/candidate-approval/CandidateDetailModal';
import candidateService from '@/services/candidate.service';
import jobService from '@/services/job.service';
import {toast} from 'sonner';


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

  const [candidateStats, setCandidateStats] = useState({
    totalCandidates: 0,
    newThisWeek: 0,
    pendingReview: 0,
    todayInterview: 0,
    offeredCount: 0,
  });

  useEffect(() => {
    const fetchCandidateStats = async () => {
      try {
        const res = await candidateService.getCandidatesNoPaging();
        if (res && res.success) {
          const list = res.dataCandidates || [];

          const totalCandidates = list.length;

          const oneWeekAgo = new Date();
          oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
          const newThisWeek = list.filter(item => {
            const date = new Date(item.appliedDate || item.createdAt);
            return date >= oneWeekAgo;
          }).length;

          const pendingReview = list.filter(item => item.stage === 'new').length;

          const todayStr = new Date().toISOString().split('T')[0];
          const todayInterview = list.filter(item => {
            if (item.stage !== 'interview') return false;
            return true;
          }).length;

          const offeredCount = list.filter(item => item.stage === 'offered').length;

          setCandidateStats({
            totalCandidates,
            newThisWeek,
            pendingReview,
            todayInterview,
            offeredCount,
          });
        }
      } catch (error) {
        console.error("Lỗi lấy thống kê ứng viên:", error);
      }
    };

    fetchCandidateStats();
  }, []);

  useEffect(() => {
    const fetchApprovalData = async () => {
      if (!jobId) {
        message.warning('Không tìm thấy mã dự án (jobId) trên URL!');
        return;
      }

      try {
        setLoading(true);
        const response = await jobService.getJobDetailsForApproval(jobId);

        const payload = response.data || response;

        if (payload) {
          if (payload.jobInfo) {
            setJobInfo(payload.jobInfo);
          }

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

  const handleUpdateStage = async (candidateId, nextStage) => {

  try {
    const res = await candidateService.updateCandidateStage(candidateId, nextStage);

    if (res && res.success) {
      toast.success('Thành công', { description: 'Đã chuyển bước ứng viên thành công!' });
      
      setCandidates(prev => 
        prev.map(item => (item._id === candidateId || item.id === candidateId) ? { ...item, stage: nextStage } : item)
      );
    } else {
      console.warn(" API trả về success không phải true:", res);
    }
  } catch (error) {
    console.error(" Lỗi gọi API chuyển bước:", error);
    toast.error('Thất bại', { description: error.message || 'Không thể chuyển bước ứng viên!' });
  }
};

  return (
    <div className="space-y-6 p-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate(-1)}
              className="rounded-xl text-xs font-bold cursor-pointer border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Quay lại
            </Button>
            {jobId && (
              <span className="bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-300 px-3 py-1 rounded-xl text-xs font-bold border border-indigo-100 dark:border-indigo-900/50">
                Mã dự án: {jobId}
              </span>
            )}
          </div>

          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight pt-2">
            {jobInfo ? `Duyệt ứng viên dự án: ${jobInfo.title}` : (jobId ? `Đang tải thông tin dự án (${jobId})...` : 'Duyệt tất cả hồ sơ ứng viên')}
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            {jobInfo
              ? `Khách hàng: ${jobInfo.client || 'Nội bộ'} | Ngân sách: ${jobInfo.budget}`
              : 'Quản lý tiến độ tuyển dụng, đánh giá năng lực và phê duyệt các ứng viên tiềm năng.'}
          </p>
        </div>
      </div>

      <CandidateStats candidates={candidates} statsData={candidateStats} />

      <CandidateBoard
        candidates={candidates}
        onOpenModal={handleOpenModal}
        onUpdateStage={handleUpdateStage}
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