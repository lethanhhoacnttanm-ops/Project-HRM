import React, {useState} from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  UserCheck,
  BookOpen,
  Clock,
  Award,
  Calendar,
  CheckCircle2,
  Hourglass
} from "lucide-react";
import { InputNumber, Slider } from "antd";
import { Form } from "antd";
import { toast } from "sonner";
import { courseprogressService } from "@/services/courseprogress.service";

const DEPARTMENTS = [
  { label: "Software Development", value: "Software Development" },
  { label: "QA/QC", value: "QA/QC" },
  { label: "Business Analysis & Product", value: "Business Analysis & Product" },
  { label: "UI/UX Design", value: "UI/UX Design" },
  { label: "DevOps & System", value: "DevOps & System" }
];

const POSITIONS_BY_DEPT = {
  "Software Development": [
    { label: "Frontend Web/App Developer", value: "Frontend Web/App Developer" },
    { label: "Backend Web/App Developer", value: "Backend Web/App Developer" },
    { label: "Mobile Developer", value: "Mobile Developer" }
  ],
  "QA/QC": [
    { label: "Manual & Automation Tester", value: "Manual & Automation Tester" }
  ],
  "Business Analysis & Product": [
    { label: "Business Analyst (BA)", value: "Business Analyst (BA)" },
    { label: "Product Manager", value: "Product Manager" }
  ],
  "UI/UX Design": [
    { label: "UI/UX Designer", value: "UI/UX Designer" }
  ],
  "DevOps & System": [
    { label: "DevOps Engineer", value: "DevOps Engineer" },
    { label: "System Administrator", value: "System Administrator" }
  ]
};

const LEVELS = [
  { label: "Intern", value: "Intern" },
  { label: "Fresher", value: "Fresher" },
  { label: "Junior", value: "Junior" },
  { label: "Middle", value: "Middle" }
];

export default function TrainingModal({ isOpen, onClose, mode, onSubmit, detailsProcessCourse, dataCourse, dataManager, loading, fetchCourseProgress }) {
  if (!detailsProcessCourse) return null;
  const isAssign = mode === "assign";
  const isCreate = mode === "create";
  const isDetail = mode === "detail"
  const isAdjust = mode === "adjust"

  const [form] = Form.useForm();

  const employee = detailsProcessCourse.employeeId || {};
  const course = detailsProcessCourse.courseId || {};
  const isCompleted = detailsProcessCourse.status === "Completed";

  const [percent, setPercent] = useState(detailsProcessCourse?.progressPercent || 0);

  const selectedManagerId = Form.useWatch("managerId", form);
  const selectedCourseId = Form.useWatch("courseId", form);

  const selectedManager = dataManager.find(m => (m._id || m.id) === selectedManagerId);
  const selectedCourse = dataCourse.find(c => (c._id || c.id) === selectedCourseId);


  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };


  const getModalTitle = () => {
    if (isAssign) return 'Phân công đào tạo';
    if (isCreate) return 'Tạo khóa học mới';
    if (isDetail) return 'Thông tin chi tiết';
    if (isAdjust) return 'Cập nhật tiến độ'
    return 'Thông tin';
  };

  const selectedDept = Form.useWatch("department", form) || "Software Development";
  const availablePositions = POSITIONS_BY_DEPT[selectedDept] || [];

  const onFinish = (values) => {
    if (onSubmit) {
      onSubmit(values);
    }
    form.resetFields();
    onClose();
  };

  const handleSubmit = async () => {
    try {
      const res = await courseprogressService.updateProgress(detailsProcessCourse._id, percent);

      if (res && res.success) {
        toast.success("Cập nhật tiến độ thành công!");
        onClose();
        fetchCourseProgress()
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Có lỗi xảy ra khi cập nhật!");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-base font-bold text-slate-900">
            {getModalTitle()}
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500">
            Chọn thông tin quản lý và khóa học cần phân công.
          </DialogDescription>
        </DialogHeader>

        {isAdjust ? (
          <div className="space-y-4 py-4">
            <p className="text-sm text-gray-600">
              Nhân viên: <span className="font-bold">{detailsProcessCourse?.employeeId?.fullName}</span>
            </p>
            <p className="text-sm text-gray-600">
              Khóa học: <span className="font-bold">{detailsProcessCourse?.courseId?.title}</span>
            </p>

            <div className="flex items-center gap-4">
              <Slider
                className="flex-1"
                min={0}
                max={100}
                onChange={(value) => setPercent(value)}
                value={typeof percent === 'number' ? percent : 0}
              />
              <InputNumber
                min={0}
                max={100}
                value={percent}
                onChange={(value) => setPercent(value)}
                formatter={(value) => `${value}%`}
                parser={(value) => value.replace('%', '')}
              />
            </div>

            {percent === 100 && (
              <p className="text-xs text-emerald-600 font-semibold">
                 Tiến độ đạt 100% - Trạng thái sẽ tự động chuyển thành "Completed"!
              </p>
            )}

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <Button variant="outline" onClick={onClose} className="rounded-xl">
                Hủy bỏ
              </Button>
              <Button
                type="primary"
                loading={loading ? true : undefined}
                onClick={handleSubmit}
                className="rounded-xl bg-indigo-600 hover:bg-indigo-700"
              >
                Lưu thay đổi
              </Button>
            </div>
          </div>
        ) : (
          <div>
          </div>
        )}

        {isCreate && (
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              department: "Software Development",
              position: "Frontend Web/App Developer",
              targetLevel: "Intern",
              durationHours: 10
            }}
            className="space-y-4 pt-2"
          >
            <Form.Item
              name="title"
              label={<span className="text-xs font-bold text-slate-700">Tên khóa học</span>}
              rules={[{ required: true, message: "Vui lòng nhập tên khóa học!" }]}
            >
              <Input
                placeholder="Ví dụ: React - The Complete Guide"
                className="h-10 text-xs rounded-xl border-slate-200 focus-visible:ring-indigo-500 bg-white"
              />
            </Form.Item>

            <Form.Item
              name="description"
              label={<span className="text-xs font-bold text-slate-700">Mô tả ngắn</span>}
            >
              <textarea
                className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Nội dung chính của khóa học..."
                rows={2}
              />
            </Form.Item>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
              <Form.Item
                className="mb-0"
                name="department"
                label={<span className="text-xs font-bold text-slate-700">Phòng ban</span>}
              >
                <Select
                  onValueChange={(val) => {
                    form.setFieldValue("department", val);
                    const defaultPos = POSITIONS_BY_DEPT[val]?.[0]?.value;
                    form.setFieldValue("position", defaultPos);
                  }}
                  initialValues="Software Development"
                >
                  <SelectTrigger className="h-10 text-xs rounded-xl border-slate-200 bg-white">
                    <SelectValue placeholder="Chọn phòng ban" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {DEPARTMENTS.map((d) => (
                      <SelectItem key={d.value} value={d.value} className="text-xs font-medium cursor-pointer">
                        {d.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Form.Item>

              <Form.Item
                name="targetLevel"
                label={<span className="text-xs font-bold text-slate-700">Cấp bậc</span>}
                className="mb-0"
              >
                <Select
                  onValueChange={(val) => form.setFieldValue("targetLevel", val)}
                  initialValues="Intern"
                >
                  <SelectTrigger className="h-10 text-xs rounded-xl border-slate-200 bg-white">
                    <SelectValue placeholder="Chọn cấp bậc" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {LEVELS.map((l) => (
                      <SelectItem key={l.value} value={l.value} className="text-xs font-medium cursor-pointer">
                        {l.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Form.Item>
            </div>

            <Form.Item
              name="position"
              label={<span className="text-xs font-bold text-slate-700">Vị trí phù hợp</span>}
              rules={[{ required: true, message: "Chọn vị trí!" }]}
              className="mb-0"
            >
              <Select
                onValueChange={(val) => form.setFieldValue("position", val)}
                value={form.getFieldValue("position")}
              >
                <SelectTrigger className="h-10 text-xs rounded-xl border-slate-200 bg-white">
                  <SelectValue placeholder="Chọn vị trí" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {availablePositions.map((p) => (
                    <SelectItem key={p.value} value={p.value} className="text-xs font-medium cursor-pointer">
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Form.Item>


            <div className="grid grid-cols-2 gap-3">
              <Form.Item
                name="courseUrl"
                label={<span className="text-xs font-bold text-slate-700">Link Udemy Business</span>}
                rules={[{ required: true, message: "Vui lòng nhập link!" }]}
              >
                <Input
                  placeholder="https://udemy.com/..."
                  className="h-10 text-xs rounded-xl border-slate-200 focus-visible:ring-indigo-500 bg-white"
                />
              </Form.Item>

              <Form.Item
                name="durationHours"
                label={<span className="text-xs font-bold text-slate-700">Thời lượng (Giờ)</span>}
              >
                <Input
                  type="number"
                  placeholder="10"
                  className="h-10 text-xs rounded-xl border-slate-200 focus-visible:ring-indigo-500 bg-white"
                />
              </Form.Item>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="rounded-xl text-xs font-semibold cursor-pointer"
              >
                Hủy bỏ
              </Button>

              <Button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
              >
                Lưu khóa học
              </Button>
            </div>
          </Form>
        )}

        {isDetail && detailsProcessCourse && (
          <div className="space-y-4 text-xs">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
              <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Thông tin nhân viên</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 font-bold flex items-center justify-center border border-indigo-100 shrink-0">
                  {employee.fullName ? employee.fullName.charAt(0).toUpperCase() : "U"}
                </div>
                <div className="space-y-0.5">
                  <p className="font-bold text-slate-900 text-sm">{employee.fullName || "N/A"}</p>
                  <p className="text-slate-500">{employee.email || "N/A"}</p>
                  <p className="text-indigo-600 font-medium">
                    Vị trí: {typeof employee.position === 'object' ? employee.position?.name || employee.position?.title : employee.position || "Nhân viên"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
              <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Khóa học được giao</p>
              <div>
                <p className="font-bold text-slate-900 text-sm">{course.title || "Khóa học không xác định"}</p>
                <div className="flex items-center gap-4 mt-2 text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-indigo-500" /> {course.durationHours || 0} giờ học
                  </span>
                  <span className="bg-indigo-50 text-indigo-600 px-2.5 py-0.5 rounded-md font-semibold">
                    {course.targetLevel || "Fresher"}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/80 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-600">Trạng thái hiện tại:</span>
                <Badge
                  className={`font-semibold text-[11px] px-3 py-1 rounded-full border-0 shadow-none ${isCompleted ? "bg-emerald-50 text-emerald-600" : "bg-indigo-50 text-indigo-600"
                    }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-3 h-3 mr-1 inline" /> : <Hourglass className="w-3 h-3 mr-1 inline" />}
                  {detailsProcessCourse.status || "In Progress"}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between font-semibold text-slate-700">
                  <span>Tiến độ hoàn thành</span>
                  <span className="text-indigo-600 font-bold">{detailsProcessCourse.progressPercent || 0}%</span>
                </div>
                <Progress value={detailsProcessCourse.progressPercent || 0} className="h-2 bg-slate-100" />
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-slate-400 text-[11px]">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Tham gia: {formatDate(detailsProcessCourse.createdAt)}
                </span>
                <span className="flex items-center gap-1">
                  <Award className={`w-3.5 h-3.5 ${isCompleted ? "text-teal-600" : "text-slate-300"}`} />
                  Chứng chỉ: {isCompleted ? "Đã cấp" : "Chưa có"}
                </span>
              </div>

              <div className="flex gap-2 pt-2 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="w-1/2 rounded-xl text-xs font-bold border-slate-200 cursor-pointer"
                >
                  Hủy bỏ
                </Button>
              </div>
            </div>
          </div>
        )}

        {isAssign && (
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="space-y-5 text-xs"
          >
            <Form.Item
              name="managerId"
              label={
                <span className="font-bold text-slate-700 flex items-center gap-2 text-xs">
                  <UserCheck className="w-4 h-4 text-indigo-600" /> Chọn Quản lý (Manager)
                </span>
              }
              rules={[{ required: true, message: 'Vui lòng chọn Quản lý phụ trách!' }]}
              className="mb-0"
            >
              <Select
                onValueChange={(value) => form.setFieldValue("managerId", value)}
                value={selectedManagerId || ""}
              >
                <SelectTrigger className="w-full h-11 px-4 rounded-xl bg-slate-50/50 hover:bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-800 transition-all shadow-xs cursor-pointer focus:ring-2 focus:ring-indigo-500/20">
                  <SelectValue placeholder="-- Chọn Manager phụ trách --">
                    {selectedManager ? `${selectedManager.fullName} (${selectedManager.email})` : "-- Chọn Manager phụ trách --"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="rounded-xl border-slate-200 shadow-xl p-1">
                  {dataManager.map((mgr) => (
                    <SelectItem key={mgr._id || mgr.id} value={mgr._id || mgr.id} className="text-xs font-medium py-2.5 px-3 rounded-lg cursor-pointer hover:bg-indigo-50/60 focus:bg-indigo-50 focus:text-indigo-900 transition-colors">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900">{mgr.fullName}</span>
                        <span className="text-[11px] text-slate-400">{mgr.email}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Form.Item>

            <Form.Item
              name="courseId"
              label={
                <span className="font-bold text-slate-700 flex items-center gap-2 text-xs">
                  <BookOpen className="w-4 h-4 text-indigo-600" /> Chọn Khóa học
                </span>
              }
              rules={[{ required: true, message: 'Vui lòng chọn Khóa học cần phân công!' }]}
              className="mb-2"
            >
              <Select
                onValueChange={(value) => form.setFieldValue("courseId", value)}
                value={selectedCourseId || ""}
              >
                <SelectTrigger className="w-full max-w-full overflow-hidden h-11 px-4 rounded-xl bg-slate-50/50 hover:bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-800 transition-all shadow-xs cursor-pointer focus:ring-2 focus:ring-indigo-500/25">
                  <div className="w-full overflow-hidden text-left truncate pr-2">
                    <SelectValue placeholder="-- Chọn Khóa học --" />
                  </div>
                </SelectTrigger>
                <SelectContent className="rounded-xl border-slate-200 shadow-xl p-1 max-h-72">
                  {dataCourse.map((crs) => (
                    <SelectItem key={crs._id || crs.id} value={crs._id || crs.id} className="text-xs font-medium py-2.5 px-3 rounded-lg cursor-pointer hover:bg-indigo-50/60 focus:bg-indigo-50 focus:text-indigo-900 transition-colors">
                      <div className="flex flex-col w-full overflow-hidden">
                        <span className="font-bold text-slate-900 truncate">{crs.title}</span>
                        <span className="text-[11px] text-indigo-600 font-medium uppercase tracking-wider">{crs.department || "Chưa phân loại"}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Form.Item>

            <div className="flex gap-2 pt-2 border-t border-slate-100">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="w-1/2 rounded-xl text-xs font-bold border-slate-200 cursor-pointer"
              >
                Hủy bỏ
              </Button>
              <Button
                type="button"
                onClick={() => form.submit()}
                disabled={loading}
                className="w-1/2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold cursor-pointer disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : "Xác nhận phân công"}
              </Button>
            </div>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}