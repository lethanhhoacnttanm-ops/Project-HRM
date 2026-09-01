import { useEffect, useState } from 'react';
import { MessageSquare, Eye, Loader2 } from 'lucide-react';

import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

export default function TicketModal({ isOpen, onClose, mode, ticket, onSubmit }) {
  const [statusValue, setStatusValue] = useState('Mở');
  const [adminResponse, setAdminResponse] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const isDetailMode = mode === 'detail';
  const isActionMode = mode === 'action';

  const getModalTitle = () => {
    if (isDetailMode) return 'Thông tin chi tiết';
    if (isActionMode) return 'Xử lý yêu cầu hỗ trợ';
    return 'Thông tin';
  };

  useEffect(() => {
    if (ticket && isOpen) {
      setStatusValue(ticket.status || 'Mở');
      setAdminResponse(ticket.adminResponse || '');
    } else {
      setStatusValue('Mở');
      setAdminResponse('');
    }
  }, [ticket, isOpen]);

  const handleSubmitAction = async (e) => {
    e.preventDefault();
    if (isDetailMode) return;

    try {
      setSubmitting(true);
      await onSubmit(ticket._id, {
        status: statusValue,
        adminResponse: adminResponse,
      });
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-base font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
            {isDetailMode ? (
              <Eye className="size-4 text-indigo-600" />
            ) : (
              <MessageSquare className="size-4 text-indigo-600" />
            )}
            <span>{getModalTitle()}:</span>
            <span className="text-indigo-600 font-mono">{ticket?.ticketCode}</span>
          </DialogTitle>
        </DialogHeader>

        {ticket && (
          <div className="space-y-4 pt-2">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Người gửi:</span>
                <span className="font-bold text-slate-800">
                  {ticket.employee?.fullName || '—'} 
                  <span className="text-slate-400 font-normal ml-1">({ticket.employee?.email})</span>
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Tiêu đề:</span>
                <span className="font-bold text-slate-900">{ticket.title}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Danh mục / Mức độ:</span>
                <span className="font-medium">
                  {ticket.category} ·{' '}
                  <span className="text-indigo-600 font-bold">{ticket.priority}</span>
                </span>
              </div>

              <div>
                <span className="text-slate-400 block mb-1">Nội dung chi tiết:</span>
                <div className="bg-white p-3 rounded-lg border border-slate-200 text-slate-700 whitespace-pre-wrap leading-relaxed">
                  {ticket.description}
                </div>
              </div>

              {isDetailMode && ticket.adminResponse && (
                <div>
                  <span className="text-slate-400 block mb-1 mt-2">Phản hồi từ Admin:</span>
                  <div className="bg-indigo-50/50 p-3 rounded-lg border border-indigo-100 text-indigo-900 whitespace-pre-wrap leading-relaxed font-medium">
                    {ticket.adminResponse}
                  </div>
                </div>
              )}
            </div>

            {isActionMode && (
              <form onSubmit={handleSubmitAction} className="space-y-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Cập nhật trạng thái phiếu</label>
                  <Select value={statusValue} onValueChange={(val) => setStatusValue(val)}>
                    <SelectTrigger className="w-full rounded-xl text-xs h-9">
                      <SelectValue placeholder="Chọn trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mở">Mở</SelectItem>
                      <SelectItem value="Đang xử lý">Đang xử lý</SelectItem>
                      <SelectItem value="Đã giải quyết">Đã giải quyết</SelectItem>
                      <SelectItem value="Đóng">Đóng</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Nội dung phản hồi / Hướng dẫn giải quyết</label>
                  <Input
                    value={adminResponse}
                    onChange={(e) => setAdminResponse(e.target.value)}
                    placeholder="Nhập câu trả lời hoặc hướng dẫn xử lý sự cố cho nhân viên..."
                    className="rounded-xl text-xs p-3 h-24 border-slate-200 shadow-none focus-visible:ring-1 focus-visible:ring-indigo-600 resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="rounded-xl text-xs h-9 px-4 cursor-pointer"
                  >
                    Hủy bỏ
                  </Button>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold h-9 px-5 cursor-pointer shadow-none"
                  >
                    {submitting && <Loader2 className="size-3.5 animate-spin mr-1.5" />}
                    Lưu thay đổi & Gửi phản hồi
                  </Button>
                </div>
              </form>
            )}

            {isDetailMode && (
              <div className="flex items-center justify-end pt-2 border-t border-slate-100">
                <Button
                  type="button"
                  onClick={onClose}
                  className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold h-9 px-5 cursor-pointer shadow-none"
                >
                  Đóng
                </Button>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}