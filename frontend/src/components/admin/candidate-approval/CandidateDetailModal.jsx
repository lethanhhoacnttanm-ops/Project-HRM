import React, { useState } from 'react';
import { Modal, Button, Input, Rate, message } from 'antd';
import { User, FileText, CheckCircle, Clock, Save } from 'lucide-react';
// import candidateService from '../../../services/candidate.service'; // Nếu cần gọi API cập nhật ghi chú/đánh giá

const CandidateDetailModal = ({ isOpen, onClose, candidate, onUpdateCandidate }) => {
  const [notes, setNotes] = useState(candidate?.interviewNotes || '');
  const [rating, setRating] = useState(candidate?.rating || 0);
  const [loading, setLoading] = useState(false);

  if (!candidate) return null;

  const handleSaveEvaluation = async () => {
    try {
      setLoading(true);
      // await candidateService.updateEvaluation(candidate._id, { interviewNotes: notes, rating });
      
      message.success('Đã lưu đánh giá ứng viên thành công!');
      if (onUpdateCandidate) {
        onUpdateCandidate({ ...candidate, interviewNotes: notes, rating });
      }
    } catch (error) {
      message.error('Lỗi khi lưu đánh giá.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
    title={
      <div className="text-base font-bold text-gray-900 dark:text-gray-100 pb-2 border-b border-gray-100 dark:border-gray-800">
        Chi tiết hồ sơ ứng viên
      </div>
    }
    open={isOpen}
    onCancel={onClose}
    footer={null}
    width={650}
    centered
    className="rounded-3xl overflow-hidden [&_.ant-modal-content]:bg-white dark:[&_.ant-modal-content]:bg-gray-900 dark:[&_.ant-modal-content]:text-gray-100 dark:[&_.ant-modal-content]:border dark:[&_.ant-modal-content]:border-gray-800"
  >
      <div className="space-y-6 py-3 max-h-[75vh] overflow-y-auto px-1">
        <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-gray-800/50 rounded-2xl">
          <div className="w-14 h-14 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center text-xl shrink-0">
            {candidate.fullName ? candidate.fullName.charAt(0).toUpperCase() : <User />}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base">{candidate.fullName}</h3>
            <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mt-0.5">
              Vị trí: {candidate.appliedPosition?.role} ({candidate.appliedPosition?.level})
            </p>
          </div>
          {candidate.cvFileUrl && (
            <a 
              href={candidate.cvFileUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-3 py-2 bg-indigo-600 dark:bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 dark:hover:bg-indigo-500 flex items-center gap-1.5 transition-all shadow-sm"
            >
              <FileText className="w-4 h-4" /> Xem CV
            </a>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 border border-gray-100 dark:border-gray-700 rounded-xl bg-white dark:bg-[#141414]">
            <span className="text-gray-400 dark:text-gray-500 block font-medium">Email liên hệ</span>
            <span className="font-semibold text-gray-800 dark:text-gray-200 break-all">{candidate.email}</span>
          </div>
          <div className="p-3 border border-gray-100 dark:border-gray-700 rounded-xl bg-white dark:bg-[#141414]">
            <span className="text-gray-400 dark:text-gray-500 block font-medium">Số điện thoại</span>
            <span className="font-semibold text-gray-800 dark:text-gray-200">{candidate.phone}</span>
          </div>
          <div className="p-3 border border-gray-100 dark:border-gray-700 rounded-xl bg-white dark:bg-[#141414]">
            <span className="text-gray-400 dark:text-gray-500 block font-medium">Giai đoạn hiện tại (Stage)</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400 uppercase">
              {candidate.stage}
            </span>
          </div>
          <div className="p-3 border border-gray-100 dark:border-gray-700 rounded-xl bg-white dark:bg-[#141414]">
            <span className="text-gray-400 dark:text-gray-500 block font-medium">Ngày nộp đơn</span>
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              {new Date(candidate.appliedDate || candidate.createdAt).toLocaleDateString('vi-VN')}
            </span>
          </div>
        </div>

        <div className="space-y-4 pt-2 border-t border-gray-100 dark:border-gray-800">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> Đánh giá & Nhật ký phỏng vấn
          </h4>

          <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-gray-800/30 rounded-xl border border-slate-100 dark:border-gray-800">
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Chấm điểm năng lực:</span>
            <Rate allowHalf value={rating} onChange={setRating} className="dark:text-amber-400" />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Ghi chú từ hội đồng tuyển dụng:</label>
            <Input.TextArea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Nhập nhận xét về kỹ năng, thái độ hoặc kết quả test của ứng viên..."
              className="rounded-xl text-xs p-3 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-500"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button onClick={onClose} className="rounded-xl text-xs font-bold border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
            Đóng
          </Button>
          <Button 
            type="primary" 
            icon={<Save className="w-3.5 h-3.5" />} 
            loading={loading}
            onClick={handleSaveEvaluation}
            className="bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-500 rounded-xl text-xs font-bold flex items-center gap-1 border-none cursor-pointer"
          >
            Lưu đánh giá
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CandidateDetailModal;