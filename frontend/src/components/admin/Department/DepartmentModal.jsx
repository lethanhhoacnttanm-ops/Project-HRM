import React, { useEffect, useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, Input, Select } from 'antd';
import { Building2, Hash, AlignLeft, Users, User2, Briefcase } from 'lucide-react';

const DepartmentModal = ({ isOpen, onClose, mode, managerOptions, onSubmit, onSubmitEmployee, onSubmitManager, onSubmitPosition, departments, departmentOptions, employeeOptions, positionOptions, levelOptions, onSubmitLevel, onSubmitDepartmentChange }) => {
  const isCreate = mode === "create";
  const isDetails = mode === "detail";
  const isEdit = mode === "edit"
  const isManager = mode === "manager"
  const isPosition = mode === "position"
  const isEmployee = mode === "employees"

  const [form] = Form.useForm();

  useEffect(() => {
    if (isEmployee) {
      if (departments && departments._id) {
        form.setFieldsValue({
          department: departments._id,
          position: undefined,
          level: undefined
        });

        if (onSubmitDepartmentChange) {
          onSubmitDepartmentChange(departments._id);
        }
      } else {
        form.setFieldsValue({ department: undefined, position: undefined, level: undefined });
      }
    }
  }, [isEmployee, departments?._id]);

  useEffect(() => {
    if (departments) {
      form.setFieldsValue({
        department: departments._id,
        manager: departments.manager?._id || departments.manager
      });
    } else {
      form.resetFields(); 
    }
  }, [departments, form]);

  const availablePositions = React.useMemo(() => {
    if (!positionOptions) return [];
    if (departments && departments._id) {
      return positionOptions.filter(p => p.departmentId === departments._id || p.departmentId?._id === departments._id);
    }
    return positionOptions;
  }, [positionOptions, departments]);

  const getModalTitle = () => {
    if (isCreate) return 'Thêm phòng ban mới';
    if (isDetails) return 'Chi tiết phòng ban';
    if (isPosition) return 'Thêm vị trí vào phòng ban';
    return 'Thông tin';
  };

  const handleFinish = (values) => {
    const payload = {
      ...values,
      manager: values.manager || null
    };

    console.log("🔥 FULL PAYLOAD GỬI ĐI:", JSON.stringify(payload, null, 2));

    if (isCreate) {
      onSubmit(payload)
    }
  };

  const handleFinishPosition = (values) => {
    if (!departments || !departments._id) {
      console.error("Không tìm thấy ID phòng ban!");
      return;
    }
    const payload = {
      ...values,
      departmentId: departments._id
    };

    if (isPosition) {
      console.log("Payload:", payload);
      onSubmitPosition(payload)
    }
  };

  const handleFinishEmployee = (values) => {
    const payload = {
      employeeId: values.employeeId,
      departmentId: values.department,
      positionId: values.position,
      level: values.level
    };
    onSubmitEmployee(payload);
  };

  const handleFinishManager = (values) => {
    const payload = {
      manager: values.manager,
      departments: values.department
    };
    onSubmitManager(payload);
  };

  const departmentWithDetails = React.useMemo(() => {
    if (!departments || typeof departments !== 'object') return null;

    const deptId = departments._id;

    const positions = positionOptions?.filter(
      (pos) => pos.departmentId === deptId || pos.departmentId?._id === deptId
    ) || [];

    const employees = employeeOptions?.filter(
      (emp) => emp.department === deptId || emp.department?._id === deptId
    ) || [];

    const levels = [...new Set(employees.map((emp) => emp.level))].filter(Boolean);

    return {
      ...departments,
      positions,
      employees,
      totalEmployees: employees.length,
      positionNames: positions.map(p => p.name).join(", "),
      levelsText: levels.join(", ")
    };
  }, [departments, positionOptions, employeeOptions]);


  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="sm:max-w-2xl rounded-2xl p-6 dark:bg-[#1f1f1f] dark:border-gray-700">
        <DialogHeader className="border-b pb-4 mb-4 border-gray-100 dark:border-gray-700">
          <DialogTitle className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            {getModalTitle()}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {getModalTitle()}
          </DialogDescription>
        </DialogHeader>

        {isCreate && (
          <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            requiredMark={false}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                name="name"
                label={<span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Tên phòng ban</span>}
                rules={[{ required: true, message: 'Vui lòng nhập tên phòng ban!' }]}
                className="mb-0"
              >
                <Input prefix={<Building2 className="w-5 h-5 text-gray-400 mr-1" />} placeholder="VD: Phòng IT, Phòng Nhân sự..." size="large" className="rounded-xl!" />
              </Form.Item>

              <Form.Item
                name="costCenter"
                label={<span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Mã phòng ban</span>}
                rules={[{ required: true, message: 'Vui lòng nhập mã trung tâm chi phí!' }]}
                className="mb-0"
              >
                <Input prefix={<Hash className="w-5 h-5 text-gray-400 mr-1" />} placeholder="VD: IT-01, HR-02" size="large" className="rounded-xl!" />
              </Form.Item>
            </div>

            <Form.Item
              name="manager"
              label={<span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Trưởng phòng</span>}
              className="mb-0"
            >
              <Select
                size="large"
                placeholder="Chọn trưởng phòng (Tùy chọn)"
                className="w-full h-10 [&>.ant-select-selector]:rounded-xl!"
                options={managerOptions || 'null'}
                allowClear
                optionFilterProp="label"
                showSearch
              />
            </Form.Item>

            <Form.Item
              name="description"
              label={<span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Mô tả nhiệm vụ</span>}
              className="mb-0"
            >
              <Input.TextArea
                placeholder="Nhập mô tả về chức năng của phòng ban này..."
                rows={4}
                className="rounded-xl! resize-none"
              />
            </Form.Item>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="rounded-xl h-10 px-5 dark:border-gray-600 dark:text-gray-300">
                Hủy
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-10 px-5 border-none">
                Tạo mới
              </Button>
            </div>
          </Form>
        )}

        {isDetails && departmentWithDetails && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-5 bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/30 rounded-2xl">
              <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <Building2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Phòng {departmentWithDetails.name}</h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-lg">
                    <Hash className="w-3 h-3" /> {departmentWithDetails.costCenter}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-lg">
                    {departmentWithDetails.status === "ACTIVE" ? "Đang hoạt động" : "Ngưng hoạt động"}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">

              <div className="p-4 bg-slate-50 dark:bg-[#141414] rounded-xl border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-1 text-xs font-medium">
                  <User2 className="w-4 h-4" /> Trưởng phòng
                </div>
                <div className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                  {departmentWithDetails.manager || "Chưa có trưởng phòng"}
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-[#141414] rounded-xl border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-1 text-xs font-medium">
                  <Users className="w-4 h-4" /> Tổng nhân sự
                </div>
                <div className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                  {departmentWithDetails.totalEmployees > 0 ? `${departmentWithDetails.totalEmployees} nhân viên` : "Chưa có nhân sự"}
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-[#141414] rounded-xl border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-1 text-xs font-medium">
                  <Users className="w-4 h-4" /> Vị trí công việc
                </div>
                <div className="font-semibold text-gray-900 dark:text-gray-100 text-sm truncate">
                  {departmentWithDetails.positionNames || "Chưa có vị trí"}
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-[#141414] rounded-xl border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-1 text-xs font-medium">
                  <Users className="w-4 h-4" /> Cấp bậc nhân sự
                </div>
                <div className="font-semibold text-gray-900 dark:text-gray-100 text-sm truncate">
                  {departmentWithDetails.levelsText || "Chưa có cấp bậc"}
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-[#141414] rounded-xl border border-gray-100 dark:border-gray-800 col-span-2">
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-1 text-xs font-medium">
                  <AlignLeft className="w-4 h-4" /> Chức năng / Nhiệm vụ
                </div>
                <div className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed">
                  {departmentWithDetails.description || "Chưa có mô tả cho phòng ban này."}
                </div>
              </div>

            </div>

            <div className="flex justify-end pt-2">
              <Button type="button" onClick={onClose} className="rounded-xl bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200 px-6">
                Đóng
              </Button>
            </div>
          </div>
        )}

        {isPosition && (
          <div className="space-y-5">
            {console.log(departments)}
            <div className="flex items-center gap-3 p-4 bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 flex items-center justify-center shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Đang thêm vị trí trực thuộc phòng ban
                </span>
                <h4 className="text-base font-bold text-gray-900 dark:text-white">
                  {departments?.name} <span className="text-xs font-normal text-gray-500">({departments?.costCenter})</span>
                </h4>
              </div>
            </div>

            <Form
              form={form}
              layout="vertical"
              onFinish={handleFinishPosition}
              requiredMark={false}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item
                  name="name"
                  label={<span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Tên vị trí (Position Name)</span>}
                  rules={[{ required: true, message: 'Vui lòng nhập tên vị trí!' }]}
                  className="mb-0"
                >
                  <Input
                    prefix={<Briefcase className="w-5 h-5 text-gray-400 mr-1" />}
                    placeholder="VD: Frontend Web, BA, Tester..."
                    size="large"
                    className="rounded-xl!"
                  />
                </Form.Item>

                <Form.Item
                  name="code"
                  label={<span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Mã vị trí (Code)</span>}
                  rules={[{ required: true, message: 'Vui lòng nhập mã vị trí!' }]}
                  className="mb-0"
                >
                  <Input
                    prefix={<Hash className="w-5 h-5 text-gray-400 mr-1" />}
                    placeholder="VD: DEV-FE"
                    size="large"
                    className="rounded-xl! uppercase"
                  />
                </Form.Item>
              </div>

              <Form.Item
                name="allowedLevels"
                label={<span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Các cấp bậc áp dụng (Allowed Levels)</span>}
                initialValue={['Intern', 'Fresher', 'Junior']}
                className="mb-0"
              >
                <Select
                  mode="multiple"
                  size="large"
                  placeholder="Chọn các cấp bậc cho vị trí này"
                  className="w-full [&>.ant-select-selector]:rounded-xl!"
                  options={[
                    { value: 'Intern', label: 'Intern' },
                    { value: 'Fresher', label: 'Fresher' },
                    { value: 'Junior', label: 'Junior' },
                    { value: 'Middle', label: 'Middle' },
                    { value: 'Senior', label: 'Senior' },
                    { value: 'Lead', label: 'Lead' },
                    { value: 'Principal', label: 'Principal' },
                  ]}
                />
              </Form.Item>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                <Button type="button" variant="outline" onClick={onClose} className="rounded-xl h-10 px-5 dark:border-gray-600 dark:text-gray-300">
                  Hủy
                </Button>
                <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-10 px-6 border-none">
                  Lưu vị trí
                </Button>
              </div>
            </Form>
          </div>
        )}

        {isEmployee && (
          <Form
            form={form}
            layout="vertical"
            onFinish={handleFinishEmployee}
            requiredMark={false}
            className="space-y-4"
          >
            <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 rounded-2xl mb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Phân bổ nhân sự
              </span>
              <h4 className="text-base font-bold text-gray-900 dark:text-white">
                Gán nhân viên vào cơ cấu tổ chức
              </h4>
            </div>

            <Form.Item
              name="employeeId"
              label={<span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Chọn Nhân Viên</span>}
              rules={[{ required: true, message: 'Vui lòng chọn nhân viên!' }]}
              className="mb-0"
            >
              <Select
                size="large"
                placeholder="-- Chọn nhân viên --"
                className="w-full [&>.ant-select-selector]:rounded-xl!"
                showSearch
                optionFilterProp="label"
                options={employeeOptions?.map((emp) => ({
                  value: emp._id,
                  label: emp.fullName
                }))}
              />
            </Form.Item>

            <Form.Item
              name="department"
              label={<span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Chọn Phòng Ban</span>}
              rules={[{ required: true, message: 'Vui lòng chọn phòng ban!' }]}
              className="mb-0"
            >
              <Select
                size="large"
                placeholder="-- Chọn phòng ban --"
                className="w-full [&>.ant-select-selector]:rounded-xl!"
                disabled={Boolean(departments && departments._id)}
                onChange={(deptId) => {
                  form.setFieldsValue({ position: undefined, level: undefined });
                  if (onSubmitDepartmentChange) onSubmitDepartmentChange(deptId);
                }}
                options={departmentOptions?.map((d) => ({ value: d._id, label: d.name }))}
              />
            </Form.Item>

            <Form.Item
              name="position"
              label={<span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Chọn Vị Trí (Position)</span>}
              rules={[{ required: true, message: 'Vui lòng chọn vị trí!' }]}
              className="mb-0"
            >
              <Select
                size="large"
                placeholder="-- Chọn vị trí công việc --"
                className="w-full [&>.ant-select-selector]:rounded-xl!"
                onChange={(posId) => {
                  form.setFieldsValue({ level: undefined });
                  if (onSubmitLevel) onSubmitLevel(posId);
                }}
                options={availablePositions?.map((pos) => ({ value: pos._id, label: pos.name }))}
              />
            </Form.Item>

            <Form.Item name="level" label="Cấp Bậc (Level)" rules={[{ required: true }]}>
              <Select
                size="large"
                placeholder="-- Chọn cấp bậc --"
                options={levelOptions}
              />
            </Form.Item>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
              <Button type="button" variant="outline" onClick={onClose} className="rounded-xl h-10 px-5">
                Hủy
              </Button>
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-10 px-6 border-none">
                Xác nhận gán
              </Button>
            </div>
          </Form>
        )}

        {isManager && (
          <Form
            form={form}
            layout="vertical"
            onFinish={handleFinishManager}
            requiredMark={false}
            className="space-y-4"
          >
            <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 rounded-2xl mb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Bổ nhiệm trưởng phòng - Phòng {departments.name} {console.log("data phòng ban đây", departments)}
              </span>
              <h4 className="text-base font-bold text-gray-900 dark:text-white">
                Gán trưởng phòng vào cơ cấu tổ chức
              </h4>
            </div>

            <Form.Item
              name="manager"
              label={<span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Chọn Trưởng Phòng</span>}
              rules={[{ required: true, message: 'Vui lòng chọn trưởng phòng!' }]}
              className="mb-0"
            >
              <Select
                size="large"
                placeholder="-- Chọn trưởng phòng --"
                className="w-full [&>.ant-select-selector]:rounded-xl!"
                showSearch
                optionFilterProp="label"
                options={managerOptions?.map((emp) => ({
                  value: emp._id,
                  label: emp.fullName
                }))}
              />
            </Form.Item>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
              <Button type="button" variant="outline" onClick={onClose} className="rounded-xl h-10 px-5">
                Hủy
              </Button>
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-10 px-6 border-none">
                Xác nhận gán
              </Button>
            </div>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DepartmentModal;