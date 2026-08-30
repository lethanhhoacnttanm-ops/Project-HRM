import React, { useState, useEffect } from 'react';
import { Calendar, Briefcase, BookOpen, FileText, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from 'sonner';

import { performanceService } from '@/services/performance.service';

const EvaluationPage = () => {
  const [currentQuarter] = useState("Q3-2026");
  const [reviewData, setReviewData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [outsourcingScore, setOutsourcingScore] = useState(5);
  const [trainingScore, setTrainingScore] = useState(5);
  const [feedback, setFeedback] = useState("");

  const fetchMyReview = async () => {
    try {
      setLoading(true);
      const res = await performanceService.getMyReviewApi(currentQuarter);
      if (res.success && res.data) {
        const data = res.data;
        setReviewData(data);
        if (data.selfAssessment) {
          setOutsourcingScore(data.selfAssessment.outsourcingScore || 0);
          setTrainingScore(data.selfAssessment.trainingScore || 0);
          setFeedback(data.selfAssessment.feedback || "");
        }
      }
    } catch (error) {
      toast.error("Không tìm thấy thông tin đánh giá cho chu kỳ này!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyReview();
  }, [currentQuarter]);

  const handleSubmitSelf = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = {
        quarter: currentQuarter,
        outsourcingScore: parseFloat(outsourcingScore),
        trainingScore: parseFloat(trainingScore),
        feedback,
      };

      const res = await performanceService.submitSelfApi(payload);
      toast.success(res.message || "Nộp đánh giá thành công!");
      fetchMyReview(); 
    } catch (error) {
      toast.error(error.response?.data?.message || "Lỗi khi nộp đánh giá!");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !reviewData) {
    return <div className="p-6 text-center text-slate-500">Đang tải dữ liệu đánh giá...</div>;
  }

  const isSubmitted = reviewData?.status === 'Submitted' || reviewData?.status === 'Approved';

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="bg-linear-to-r from-indigo-500 to-violet-600 rounded-2xl p-5 text-white shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/20 text-[11px] font-semibold tracking-wide">
            <Calendar className="w-3.5 h-3.5" /> Chu kỳ: {currentQuarter}
          </div>
          <h2 className="text-lg font-bold">Đánh giá hiệu suất làm việc</h2>
          <p className="text-xs text-indigo-100">
            {isSubmitted
              ? "Bạn đã hoàn thành nộp form tự đánh giá. Đang chờ Quản lý/Admin rà soát và chốt kết quả."
              : "Vui lòng tự đánh giá các chỉ số công việc và đóng góp ý kiến hoàn thiện cho quý này."}
          </p>
        </div>
        <div className="shrink-0">
          {reviewData?.status === 'Draft' && (
            <span className="px-3 py-1.5 bg-amber-400/90 text-amber-950 font-bold text-xs rounded-xl shadow-sm">
              Chưa nộp
            </span>
          )}
          {reviewData?.status === 'Submitted' && (
            <span className="px-3 py-1.5 bg-blue-400/90 text-blue-950 font-bold text-xs rounded-xl shadow-sm flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Đã nộp (Chờ duyệt)
            </span>
          )}
          {reviewData?.status === 'Approved' && (
            <span className="px-3 py-1.5 bg-emerald-400/90 text-emerald-950 font-bold text-xs rounded-xl shadow-sm flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Đã được chốt
            </span>
          )}
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
        <form onSubmit={handleSubmitSelf} className="space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-800">Biểu mẫu tự chấm điểm cá nhân</h3>
            <p className="text-xs text-slate-500">Điền điểm số trung thực dựa trên kết quả thực tế (Thang điểm từ 0 đến 5)</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                <Briefcase className="w-4 h-4 text-indigo-500" /> Điểm Outsource tự chấm (0 - 5)
              </Label>
              <Input
                type="number"
                min="0"
                max="5"
                step="0.1"
                disabled={isSubmitted}
                value={outsourcingScore}
                onChange={(e) => setOutsourcingScore(e.target.value)}
                className="h-10 border-slate-200 text-xs font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                <BookOpen className="w-4 h-4 text-indigo-500" /> Điểm Đào tạo tự chấm (0 - 5)
              </Label>
              <Input
                type="number"
                min="0"
                max="5"
                step="0.1"
                disabled={isSubmitted}
                value={trainingScore}
                onChange={(e) => setTrainingScore(e.target.value)}
                className="h-10 border-slate-200 text-xs font-medium"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
              <FileText className="w-4 h-4 text-indigo-500" /> Tự nhận xét & Đề xuất ý kiến
            </Label>
            <Textarea
              rows={4}
              disabled={isSubmitted}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Tóm tắt những thành tựu, khó khăn đã gặp phải và đề xuất trong quý..."
              className="border-slate-200 text-xs resize-none"
            />
          </div>

          {!isSubmitted ? (
            <div className="flex justify-end pt-3 border-t border-slate-100">
              <Button
                type="submit"
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl h-10 px-6 shadow-sm flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? "Đang gửi..." : "Nộp đánh giá cho Quản lý"}</span>
              </Button>
            </div>
          ) : (
            <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-xs text-blue-700 flex items-center gap-2 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0 text-blue-500" />
              <span>Bạn đã khóa dữ liệu tự đánh giá. Mọi thay đổi tiếp theo cần sự cho phép của Quản lý trực tiếp.</span>
            </div>
          )}
        </form>
      </div>

      {reviewData?.status === 'Approved' && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 space-y-3">
          <h3 className="text-sm font-bold text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Kết quả đánh giá chính thức từ Admin
          </h3>
          <div className="grid grid-cols-2 gap-4 text-xs font-medium text-emerald-900">
            <div>Điểm Outsource chốt: <span className="font-bold text-sm">{reviewData.outsourcingScore} / 5</span></div>
            <div>Điểm Đào tạo chốt: <span className="font-bold text-sm">{reviewData.trainingScore} / 5</span></div>
          </div>
          <div className="text-xs text-emerald-800 bg-white/60 p-3 rounded-xl border border-emerald-100">
            <b>Nhận xét từ cấp quản lý:</b> {reviewData.feedback || "Không có nhận xét chi tiết."}
          </div>
        </div>
      )}
    </div>
  );
};

export default EvaluationPage;