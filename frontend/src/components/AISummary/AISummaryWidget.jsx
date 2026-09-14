import React, { useState } from 'react';
import { Card, Spin, Typography } from 'antd';
import { Sparkles, ArrowRight, RefreshCw } from 'lucide-react';
import { aiService } from '@/services/ai.service';

const { Text, Paragraph } = Typography;

const PAGE_SUMMARIES = {
    '/admin-page/dashboard': {
        title: "AI Tổng quan điều hành",
        suggestions: [
            "Tổng số lượng nhân viên hiện tại là bao nhiêu?",
            "Nhân viên mới gia nhập trong tháng này gồm những ai?"
        ]
    },
    '/admin-page/performance': {
        title: "AI Phân tích hiệu suất",
        suggestions: [
            "Phòng ban nào đạt hiệu suất cao nhất kỳ vừa rồi?",
            "Thống kê các nhân sự có nguy cơ tụt giảm KPI"
        ]
    },
    '/admin-page/contracts': {
        title: "AI Báo cáo hợp đồng",
        suggestions: [
            "Thống kê tổng quan tình trạng hợp đồng hiện tại",
            "Liệt kê các nhân sự mới chưa ký hợp đồng"
        ]
    },
    '/admin-page/recruitment': {
        title: "AI Phễu tuyển dụng",
        suggestions: [
            "Số lượng ứng viên đang ở vòng phỏng vấn là bao nhiêu?",
            "Đánh giá tiến độ tuyển dụng tháng này"
        ]
    }
};
export default function AISummaryWidget({ currentPath }) {
    const [loading, setLoading] = useState(false);
    const [summaryResult, setSummaryResult] = useState(null);
    const [activeQuestion, setActiveQuestion] = useState('');

    const pageConfig = PAGE_SUMMARIES[currentPath];

    if (!pageConfig) return null;

    const handleFetchSummary = async (questionText) => {
        setActiveQuestion(questionText);
        setLoading(true);
        setSummaryResult(null);

        try {
            const responseData = await aiService.sendMessage({
                message: questionText,
                pageContext: currentPath
            });

            const botReply =
                responseData?.reply ||
                responseData?.data?.reply ||
                responseData?.message ||
                (typeof responseData === 'string' ? responseData : null) ||
                JSON.stringify(responseData);

            setSummaryResult(botReply);
        } catch (err) {
            setSummaryResult("Không thể tải tóm tắt lúc này. Vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card
            className="mb-6 bg-linear-to-r from-blue-50/60 to-indigo-50/60 border border-purple-200/80 shadow-sm rounded-2xl overflow-hidden"
            bodyStyle={{ padding: '16px 20px' }}
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 bg-blue-600 text-white rounded-lg">
                            <Sparkles className="w-4 h-4" />
                        </div>
                        <span className="font-semibold text-gray-800 text-base">{pageConfig.title}</span>
                    </div>

                    <p className="text-xs text-gray-500 mb-3">
                        Chọn nhanh một câu hỏi bên dưới để AI tổng hợp dữ liệu từ hệ thống cho trang này:
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {pageConfig.suggestions.map((sug, idx) => (
                            <button
                                key={idx}
                                disabled={loading}
                                onClick={() => handleFetchSummary(sug)}
                                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${activeQuestion === sug
                                        ? 'bg-blue-600 text-white shadow-sm'
                                        : 'bg-white text-blue-700 border border-purple-200 hover:bg-blue-100'
                                    }`}
                            >
                                <span>{sug}</span>
                                <ArrowRight className="w-3 h-3 opacity-70" />
                            </button>
                        ))}
                    </div>
                </div>

                {summaryResult && !loading && (
                    <button
                        onClick={() => handleFetchSummary(activeQuestion)}
                        className="self-start md:self-center p-2 text-gray-400 hover:text-purple-600 transition-colors"
                        title="Làm mới tóm tắt"
                    >
                        <RefreshCw className="w-4 h-4" />
                    </button>
                )}
            </div>

            {(loading || summaryResult) && (
                <div className="mt-4 pt-4 border-t border-purple-100 text-sm text-gray-700">
                    {loading ? (
                        <div className="flex items-center gap-2 text-purple-600 text-xs py-2">
                            <Spin size="small" />
                            <span>AI đang phân tích dữ liệu MongoDB để tóm tắt cho bạn...</span>
                        </div>
                    ) : (
                        <div className="bg-white/80 p-3.5 rounded-xl border border-purple-100 shadow-inner whitespace-pre-wrap leading-relaxed text-gray-800">
                            <span className="font-semibold text-purple-900 block mb-1 text-xs uppercase tracking-wider">Kết quả phân tích:</span>
                            {typeof summaryResult === 'string' && summaryResult.trim() === '{}'
                                ? "Hiện chưa có dữ liệu chi tiết cho mục này trong hệ thống."
                                : summaryResult}
                        </div>
                    )}
                </div>
            )}
        </Card>
    );
}