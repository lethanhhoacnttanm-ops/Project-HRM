import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerClose } from "@/components/ui/drawer";
import { Form, Row, Col, Select, DatePicker, InputNumber } from 'antd';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, FormInput, MinusCircle, Briefcase, DollarSign, Calendar, Layers, FileText, ArrowDown, ArrowUp, Flame, Minus } from "lucide-react";

const getPriorityConfig = (priority) => {
  switch (priority) {
    case 'Khẩn cấp': return { color: 'text-rose-700', bg: 'bg-rose-50 border-rose-200', icon: <Flame className="w-4 h-4 text-rose-500" /> };
    case 'Cao': return { color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200', icon: <ArrowUp className="w-4 h-4 text-amber-500" /> };
    case 'Trung bình': return { color: 'text-indigo-700', bg: 'bg-indigo-50 border-indigo-200', icon: <Minus className="w-4 h-4 text-indigo-500" /> };
    case 'Thấp':
    default: return { color: 'text-slate-600', bg: 'bg-slate-100 border-slate-200', icon: <ArrowDown className="w-4 h-4 text-slate-400" /> };
  }
};

const JobModal = ({ isOpen, onClose, mode, onSubmit, dataPosition, dataJobs }) => {

  const isCreate = mode === 'create'
  const isDetail = mode === 'details'
  const isEdit = mode === 'edit'

  const [form] = Form.useForm();

  const getModalTitle = () => {
    if (isCreate) return 'Thêm bài đăng công việc mới';
    if (isDetail) return 'Chi tiết dự án';
    return 'Thông tin';
  };

  // useEffect(() => {
  //   if (isOpen) {
  //     if (isEdit && dataJobs) {
  //       form.setFieldsValue({
  //         title: dataJobs.title,
  //         client: dataJobs.client,
  //         budget: dataJobs.budget,
  //         deadline: dataJobs.deadline ? dataJobs.deadline.split('T')[0] : '',
  //         priority: dataJobs.priority,
  //         description: dataJobs.description,
  //         techStack: Array.isArray(dataJobs.techStack) ? dataJobs.techStack.join(', ') : dataJobs.techStack,
  //         requirements: Array.isArray(dataJobs.requirements) ? dataJobs.requirements.join('\n') : dataJobs.requirements,
  //         positions: dataJobs.positions || [{ role: undefined, level: 'Junior', slots: 1 }]
  //       });
  //     } else {
  //       form.resetFields();
  //     }
  //   }
  // }, [isOpen, mode, dataJobs, form]);

  const handleAddPosition = () => {
    setFormData({
      ...formData,
      positions: [...formData.positions, { role: 'Backend Developer', slots: 1, minLevel: 'Middle' }]
    });
  };

  const handleRemovePosition = (index) => {
    const updatedPositions = formData.positions.filter((_, i) => i !== index);
    setFormData({ ...formData, positions: updatedPositions });
  };

  const handlePositionChange = (index, field, value) => {
    const updatedPositions = [...formData.positions];
    updatedPositions[index][field] = value;
    setFormData({ ...formData, positions: updatedPositions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
    onClose();
  };

  const onFinish = (values) => {
    if (isDetail) return;
    if (onSubmit) onSubmit(values);
    onClose();
  };

  const priorityConfig = getPriorityConfig(dataJobs?.priority);


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl rounded-2xl p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-base font-extrabold text-gray-900 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-indigo-600" />
            {getModalTitle()}
          </DialogTitle>
          <DialogDescription className="text-xs text-gray-500">
            {getModalTitle()}
          </DialogDescription>
        </DialogHeader>

        {isCreate && (
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="pt-2 space-y-1"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Form.Item
                name="title"
                label={<span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Tên dự án</span>}
                rules={[{ required: true, message: 'Vui lòng nhập tên dự án!' }]}
                className="mb-3"
              >
                <Input placeholder="VD: Dự án Web E-commerce X" className="rounded-xl py-2 text-xs" />
              </Form.Item>

              <Form.Item
                name="client"
                label={<span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Khách hàng / Đối tác</span>}
                className="mb-3"
              >
                <Input placeholder="VD: Global Tech" className="rounded-xl py-2 text-xs" />
              </Form.Item>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Form.Item
                name="budget"
                label={<span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Chi phí / Ngân sách</span>}
                rules={[{ required: true, message: 'Vui lòng nhập ngân sách!' }]}
                className="mb-3"
              >
                <Input placeholder="VD: 150.000.00 VNĐ" className="rounded-xl py-2 text-xs" />
              </Form.Item>

              <Form.Item
                name="priority"
                label={<span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Mức độ ưu tiên</span>}
                className="mb-3"
              >
                <Select
                  placeholder="Chọn độ ưu tiên"
                  className="text-xs"
                  options={[
                    { value: 'Thấp', label: 'Thấp' },
                    { value: 'Trung bình', label: 'Trung bình' },
                    { value: 'Cao', label: 'Cao' },
                    { value: 'Khẩn cấp', label: 'Khẩn cấp' },
                  ]}
                />
              </Form.Item>
            </div>

            <Form.Item
              name="deadline"
              label={<span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Thời hạn hoàn thành (Deadline)</span>}
              rules={[{ required: true, message: 'Vui lòng chọn deadline!' }]}
              className="mb-3"
            >
              <Input type="date" className="rounded-xl py-2 text-xs" />
            </Form.Item>

            <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800 mb-3">
              <Label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-2">
                Định biên vị trí, Cấp bậc & Số lượng <span className="text-red-500">*</span>
              </Label>

              <Form.List name="positions">
                {(fields, { add, remove }) => (
                  <div className="space-y-2">
                    {fields.map(({ key, name, ...restField }) => (
                      <div key={key} className="flex items-center gap-2 bg-white dark:bg-slate-800 p-2 rounded-xl border border-slate-200 dark:border-slate-700">

                        <Form.Item
                          {...restField}
                          name={[name, 'role']}
                          rules={[{ required: true, message: 'Chọn vai trò' }]}
                          className="mb-0 flex-1"
                        >
                          <Select
                            placeholder="Chọn vai trò"
                            className="text-xs"
                            showSearch
                            optionFilterProp="label"
                            options={dataPosition.map((pos) => ({
                              value: pos.name,
                              label: pos.name,
                            }))}
                          />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          name={[name, 'level']}
                          rules={[{ required: true, message: 'Chọn cấp' }]}
                          className="mb-0 w-28"
                        >
                          <Select
                            placeholder="Cấp bậc"
                            className="text-xs"
                            options={[
                              { value: 'Fresher', label: 'Fresher' },
                              { value: 'Junior', label: 'Junior' },
                              { value: 'Middle', label: 'Middle' },
                              { value: 'Senior', label: 'Senior' },
                              { value: 'Lead', label: 'Lead' },
                            ]}
                          />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          name={[name, 'slots']}
                          initialValue={1}
                          rules={[{ required: true, message: 'SL' }]}
                          className="mb-0 w-16"
                        >
                          <FormInput min={1} placeholder="SL" className="w-full text-xs" />
                        </Form.Item>

                        {fields.length > 1 && (
                          <MinusCircle
                            onClick={() => remove(name)}
                            className="text-rose-500 cursor-pointer hover:text-rose-700 text-base"
                          />
                        )}
                      </div>
                    ))}

                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<Plus />}
                      className="text-xs rounded-xl border-indigo-200 text-indigo-600 hover:border-indigo-400"
                    >
                      Thêm vị trí
                    </Button>
                  </div>
                )}
              </Form.List>
            </div>

            <Form.Item
              name="techStack"
              label={<span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Mảng công nghệ (Tech Stack)</span>}
              className="mb-3"
            >
              <Input placeholder="VD: ReactJS, Node.js, Tailwind, PostgreSQL" className="rounded-xl py-2 text-xs" />
            </Form.Item>

            <Form.Item
              name="description"
              label={<span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Mô tả tổng quan dự án</span>}
              className="mb-3"
            >
              <Textarea rows={2} placeholder="Nhập mô tả chi tiết về quy mô, mục tiêu dự án..." className="rounded-xl text-xs resize-none" />
            </Form.Item>

            <Form.Item
              name="requirements"
              label={<span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Yêu cầu chi tiết / Ghi chú thêm</span>}
              className="mb-4"
            >
              <Textarea rows={2} placeholder="- Có kinh nghiệm thực chiến ít nhất 1 dự án tương tự...&#10;- Cam kết tiến độ." className="rounded-xl text-xs resize-none" />
            </Form.Item>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <Button
                type="default"
                onClick={onClose}
                className="rounded-xl font-bold text-xs h-9 cursor-pointer"
              >
                Hủy
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs h-9 border-none cursor-pointer"
              >
                Tạo bài đăng dự án
              </Button>
            </div>
          </Form>
        )}

        {isDetail && (
          <div className="space-y-5 pt-2 text-slate-700">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Ngân sách</div>
                  <div className="text-xs font-bold text-slate-900 dark:text-slate-100">{dataJobs?.budget || 'Thỏa thuận'}</div>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <Calendar className="w-5 h-5 text-indigo-600 shrink-0" />
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Deadline</div>
                  <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    {dataJobs?.deadline ? new Date(dataJobs?.deadline).toLocaleDateString('vi-VN') : 'Không có'}
                  </div>
                </div>
              </div>

              <div className={`p-3 rounded-2xl border flex items-center gap-3 ${priorityConfig.bg}`}>
                {priorityConfig.icon}
                <div>
                  <div className="text-[10px] font-bold opacity-75 uppercase">Độ ưu tiên</div>
                  <div className={`text-xs font-bold ${priorityConfig.color}`}>{dataJobs?.priority || 'Trung bình'}</div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-indigo-600" /> Mô tả tổng quan dự án
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 whitespace-pre-line leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800">
                {dataJobs?.description || 'Chưa có mô tả chi tiết.'}
              </p>
            </div>

            {dataJobs?.techStack && (
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-indigo-600" /> Mảng công nghệ (Tech Stack)
                </h4>
                <div className="text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 font-medium">
                  {Array.isArray(dataJobs?.techStack) ? dataJobs?.techStack.join(', ') : dataJobs?.techStack}
                </div>
              </div>
            )}

            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-indigo-600" /> Định biên nhân sự cần tuyển
              </h4>
              <div className="space-y-2">
                {dataJobs?.positions?.map((pos, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800 text-xs">
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {pos.role} <span className="text-slate-500 font-normal">({pos.level})</span>
                    </span>
                    <span className="font-extrabold text-indigo-600 dark:text-indigo-400">SL: {pos.slots} người</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-indigo-600" /> Yêu cầu chi tiết / Ghi chú
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 whitespace-pre-line leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800">
                {dataJobs?.requirements || 'Không có yêu cầu đặc biệt.'}
              </p>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100 dark:border-slate-800">
              <Button onClick={onClose} className="rounded-xl font-bold text-xs h-9 cursor-pointer">
                Đóng
              </Button>
            </div>
          </div>
        )
        }
      </DialogContent>
    </Dialog>
  );
};

export default JobModal;