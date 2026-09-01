import React, { useEffect, useState } from 'react';
import { Form } from 'antd';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Bell, FileText, Tag, Users, CheckCircle, AlertTriangle } from 'lucide-react';

const NotificationModal = ({ isOpen, onClose, mode, record, onSubmit }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const isCreate = mode === 'create';
  const isEdit = mode === "edit"
  const isDelete = mode === "delete"

  useEffect(() => {
    if (isOpen) {
      if (isCreate) {
        form.resetFields();
        form.setFieldsValue({
          type: 'Tin tức chung',
          recipientGroup: 'Toàn công ty',
          status: 'Nháp'
        });
      } else if (isEdit && record) {
        form.setFieldsValue({
          title: record.title,
          subTitle: record.subTitle,
          type: record.type,
          recipientGroup: record.recipientGroup,
          status: record.status,
          content: record.content,
        });
      }
    }
  }, [isOpen, mode, record, form, isCreate, isEdit]);

  const handleFinish = async () => {
    try {
      setLoading(true);
      if (isDelete) {
        await onSubmit(record._id, mode);
      } else {
        const values = await form.validateFields();
        await onSubmit(values, mode);
      }
    } catch (error) {
      console.error('Lỗi thao tác modal thông báo:', error);
    } finally {
      setLoading(false);
    }
  };

 return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`rounded-2xl p-6 flex flex-col overflow-hidden bg-white ${isDelete ? 'sm:max-w-md' : 'sm:max-w-xl max-h-[85vh]'}`}>
        
        <DialogHeader className="shrink-0 space-y-1 pb-2">
          <DialogTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
            {isDelete ? (
              <>
                <AlertTriangle className="w-5 h-5 text-rose-600" />
                <span className="text-rose-600">Xác nhận xóa thông báo</span>
              </>
            ) : isCreate ? (
              <>
                <Bell className="w-5 h-5 text-indigo-600" />
                Tạo thông báo nội bộ mới
              </>
            ) : (
              <>
                <Bell className="w-5 h-5 text-indigo-600" />
                Chỉnh sửa thông tin thông báo
              </>
            )}
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500">
            {isDelete 
              ? 'Hành động này không thể hoàn tác. Thông báo sẽ bị xóa vĩnh viễn khỏi hệ thống.' 
              : isCreate 
              ? 'Đăng tải thông tin, tin tức hoặc sự kiện mới đến toàn thể nhân sự.' 
              : `Cập nhật nội dung cho thông báo: "${record?.title || ''}"`}
          </DialogDescription>
        </DialogHeader>

        {/* Nội dung bên trong: Nếu là delete thì hiện cảnh báo, ngược lại hiện Form */}
        <div className="flex-1 overflow-y-auto py-2 pr-1 space-y-3 my-2">
          {isDelete ? (
            <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-100 text-xs text-slate-700 space-y-1">
              <p>Bạn có chắc chắn muốn xóa thông báo:</p>
              <p className="font-bold text-slate-900 text-sm">"{record?.title}"</p>
              <p className="text-slate-500">Dữ liệu liên quan đến lịch sử đã đọc của nhân viên cũng sẽ bị loại bỏ.</p>
            </div>
          ) : (
            <Form form={form} layout="vertical" className="space-y-1">
              <Form.Item 
                name="title" 
                label={<span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5"><FileText className="w-3.5 h-3.5 text-indigo-500" /> Tiêu đề thông báo</span>} 
                rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
              >
                <Input placeholder="VD: Lịch nghỉ lễ..." className="rounded-xl h-10 border-slate-200" />
              </Form.Item>

              <Form.Item 
                name="subTitle" 
                label={<span className="text-xs font-semibold text-slate-700">Tiêu đề phụ / Mô tả ngắn</span>}
              >
                <Input placeholder="VD: Thông báo quan trọng..." className="rounded-xl h-10 border-slate-200" />
              </Form.Item>

              <div className="grid grid-cols-2 gap-4">
                <Form.Item 
                  name="type" 
                  label={<span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5"><Tag className="w-3.5 h-3.5 text-indigo-500" /> Phân loại</span>} 
                  rules={[{ required: true, message: 'Vui lòng chọn loại!' }]}
                >
                  <Select onValueChange={(val) => form.setFieldValue('type', val)}>
                    <SelectTrigger className="w-full h-10 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm">
                      <SelectValue placeholder="Chọn loại thông báo" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="Tin tức chung">Tin tức chung</SelectItem>
                      <SelectItem value="Sự kiện">Sự kiện</SelectItem>
                      <SelectItem value="Chính sách">Chính sách</SelectItem>
                      <SelectItem value="Khẩn cấp">Khẩn cấp</SelectItem>
                      <SelectItem value="Hệ thống">Hệ thống</SelectItem>
                    </SelectContent>
                  </Select>
                </Form.Item>

                <Form.Item 
                  name="recipientGroup" 
                  label={<span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-indigo-500" /> Đối tượng nhận</span>} 
                  rules={[{ required: true, message: 'Chọn nhóm nhận!' }]}
                >
                  <Select onValueChange={(val) => form.setFieldValue('recipientGroup', val)}>
                    <SelectTrigger className="w-full h-10 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm">
                      <SelectValue placeholder="Chọn nhóm" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="Toàn công ty">Toàn công ty</SelectItem>
                      <SelectItem value="Phòng Kỹ thuật">Phòng Kỹ thuật</SelectItem>
                      <SelectItem value="Phòng Kinh doanh">Phòng Kinh doanh</SelectItem>
                    </SelectContent>
                  </Select>
                </Form.Item>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Form.Item 
                  name="status" 
                  label={<span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-indigo-500" /> Trạng thái</span>}
                >
                  <Select onValueChange={(val) => form.setFieldValue('status', val)}>
                    <SelectTrigger className="w-full h-10 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm">
                      <SelectValue placeholder="Trạng thái" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="Nháp">Nháp</SelectItem>
                      <SelectItem value="Đã gửi">Đã gửi ngay</SelectItem>
                      <SelectItem value="Đang chờ">Đang chờ duyệt</SelectItem>
                    </SelectContent>
                  </Select>
                </Form.Item>
              </div>

              <Form.Item 
                name="content" 
                label={<span className="text-xs font-semibold text-slate-700">Nội dung chi tiết thông báo</span>} 
                rules={[{ required: true, message: 'Vui lòng nhập nội dung chi tiết!' }]}
              >
                <Textarea rows={4} placeholder="Nhập nội dung thông báo..." className="rounded-xl border-slate-200 resize-none" />
              </Form.Item>
            </Form>
          )}
        </div>

        <div className="shrink-0 pt-3 border-t border-slate-100 flex items-center justify-end gap-3 mt-auto">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose} 
            className="rounded-xl text-xs font-bold cursor-pointer"
          >
            Hủy bỏ
          </Button>
          <Button 
            type="button"
            disabled={loading} 
            onClick={handleFinish}
            className={`rounded-xl text-xs font-bold text-white cursor-pointer ${
              isDelete ? 'bg-rose-600 hover:bg-rose-700' : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {loading ? "Đang xử lý..." : isDelete ? "Xác nhận xóa" : isCreate ? "Tạo thông báo" : "Cập nhật thay đổi"}
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  );
};

export default NotificationModal;