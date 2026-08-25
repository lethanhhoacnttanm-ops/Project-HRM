import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import RecruitmentStats from '../../../components/admin/job-posting/RecruitmentStats';
import JobFilter from '../../../components/admin/job-posting/JobFilter';
import JobCardList from '../../../components/admin/job-posting/JobCardList';
import JobModal from '../../../components/admin/job-posting/JobModal';

import { positionService } from "../../../services/position.service.js";
import jobService from '@/services/job.service';

import { toast } from 'sonner'


const JobPostingPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [department, setDepartment] = useState('all');
  const [contractType, setContractType] = useState('all');

  const navigate = useNavigate();

  const [dataPosition, setDataPosition] = useState([])
  const [dataJobs, setDataJobs] = useState([])

  const [pageNumber, setPageNumber] = useState(1);

  const [pageSize] = useState(5);

  const [paginationInfo, setPaginationInfo] = useState({ totalEmp: 0, totalPage: 1 });

  const [modalState, setModalState] = useState({ isOpen: false, mode: 'create', data: null });

  const filteredJobs = dataJobs.filter((j) => {
    const matchSearch = j.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDept = department === 'all' || j.department === department;
    const matchType = contractType === 'all' || j.type === contractType;
    return matchSearch && matchDept && matchType;
  });

  useEffect(() => {
    const fetchPosition = async () => {
      try {
        const res = await positionService.getAllList();
        if (res?.success) {
          setDataPosition(res?.dataList);
        } else {
          setDataPosition([]);
        }
      } catch (error) {
        toast.error('Thất bại', {
          description: error.message || 'Không thể lấy danh sách vị trí cho phòng ban!',
        });
      }
    };

    fetchPosition();
  }, []);

  const fetchJobs = useCallback(async () => {
    try {
      const res = await jobService.getAllJobs(pageNumber, pageSize);
      if (res?.success) {
        setDataJobs(res.dataJobs);
        setPaginationInfo(res.pagination || { totalJobs: 0, totalPage: 1 });
      } else {
        setDataJobs([]);
      }
    } catch (error) {
      setDataJobs([]);
      toast.error('Thất bại', {
        description: error.message || 'Không thể lấy danh sách bài đăng!',
      });
    }
  }, [pageNumber, pageSize]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleCreateJob = async (values) => {
    try {

      const result = await jobService.createJob(values);

      if (result.success || result.status === 'success' || result) {
        toast.success("Tạo bài đăng dự án thành công!");
      }
    } catch (error) {
      console.error("Lỗi khi tạo bài đăng:", error);
      toast.error(error.message || "Không thể tạo bài đăng lúc này!");
    }
  };

  const handleNavigateApproval = async (jobId) => {
    try {
      const response = await jobService.getJobDetailsForApproval(jobId);

      if (response && (response.success !== false)) {
        const jobData = response.data || response;

        navigate(`/admin-page/candidates?jobId=${jobId}`, { state: { jobData } });
      } else {
        console.warn("API không trả về success thành công:", response);
      }
    } catch (error) {
      console.error("Lỗi khi chuẩn bị dữ liệu chuyển trang:", error);
    }
  };
  const handleOpenModal = (mode, data) => {
    setModalState({ isOpen: true, mode, data });
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, mode: 'create', data: null });
  };

  return (
    <div className="space-y-6 p-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Quản lý Dự án & Tuyển dụng nội bộ</h1>
          <p className="text-xs text-gray-500 font-medium mt-1 max-w-2xl">
            Tiếp nhận các dự án ngoài, định biên vị trí (BA, Dev, Tester) và phân bổ nhân sự nội bộ để tối ưu hóa nguồn lực và tạo cơ sở đánh giá hiệu suất.
          </p>
        </div>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => handleOpenModal('create')}
          className="bg-indigo-600 hover:bg-indigo-700 h-10 px-5 rounded-xl font-bold border-none shadow-2xs cursor-pointer"
        >
          Tạo dự án / bài đăng
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

      <JobCardList dataJobs={dataJobs} pagination={paginationInfo} pageSize={pageSize} pageNumber={pageNumber} setPageNumber={setPageNumber} propState={setModalState} onNavigateApproval={handleNavigateApproval} />

      <JobModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        mode={modalState.mode}

        dataPosition={dataPosition}
        dataJobs={modalState.data}
        onSubmit={handleCreateJob}
      />
    </div>
  );
};

JobPostingPage.displayName = "JobPostingPage";

export default JobPostingPage;