import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


const JobModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    type: '',
    salary: '',
    requirements: '',
  });

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        title: '',
        department: '',
        type: '',
        salary: '',
        requirements: '',
      });
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-125 rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-extrabold text-gray-800">
            Tạo bài đăng tuyển dụng mới
          </DialogTitle>
          <DialogDescription className="sr-only">
            Điền các thông tin cần thiết để tạo bài đăng tuyển dụng mới
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="pt-2 space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="title" className="text-xs font-semibold text-gray-700">
              Tiêu đề công việc <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              required
              placeholder="Kỹ sư sản phẩm cấp cao"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="rounded-xl py-2 text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="department" className="text-xs font-semibold text-gray-700">
                Phòng ban <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.department}
                onValueChange={(val) => setFormData({ ...formData, department: val })}
                required
              >
                <SelectTrigger id="department" className="h-10 text-xs rounded-xl">
                  <SelectValue placeholder="Chọn phòng ban" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="Business Analyst" className="text-xs">Business Analyst</SelectItem>
                  <SelectItem value="Thiết kế" className="text-xs">Thiết kế</SelectItem>
                  <SelectItem value="Kỹ thuật" className="text-xs">Kỹ thuật</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="type" className="text-xs font-semibold text-gray-700">
                Hình thức <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.type}
                onValueChange={(val) => setFormData({ ...formData, type: val })}
                required
              >
                <SelectTrigger id="type" className="h-10 text-xs rounded-xl">
                  <SelectValue placeholder="Chọn hình thức" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="Toàn thời gian" className="text-xs">Toàn thời gian</SelectItem>
                  <SelectItem value="Từ xa" className="text-xs">Từ xa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="salary" className="text-xs font-semibold text-gray-700">
              Mức lương
            </Label>
            <Input
              id="salary"
              placeholder="10.000 - 15.000 USD"
              value={formData.salary}
              onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
              className="rounded-xl py-2 text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="requirements" className="text-xs font-semibold text-gray-700">
              Mô tả / Yêu cầu chính
            </Label>
            <Textarea
              id="requirements"
              rows={3}
              placeholder="- Có hơn 5 năm kinh nghiệm..."
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              className="rounded-xl text-xs resize-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-xl font-bold text-xs"
            >
              Hủy
            </Button>
            <Button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs border-none"
            >
              Đăng tin
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default JobModal;