import React, { useState, useEffect } from "react";
import { Form, Row, Col, Select } from 'antd';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Building2 } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { DatePicker } from "antd";

export default function PromotionModal({ isOpen, onClose, mode, dataEmployee, dataDepartment, dataPosition, onSubmitPromotion }) {
  const isCreate = mode === 'create';
  const [form] = Form.useForm();

  const getModalTitle = () => {
    if (isCreate) return 'Thêm đề xuất mới';
    return 'Thông tin';
  };

  const levelsList = [
    { label: 'Intern', value: 'Intern' },
    { label: 'Fresher', value: 'Fresher' },
    { label: 'Junior', value: 'Junior' },
    { label: 'Middle', value: 'Middle' },
    { label: 'Senior', value: 'Senior' },
    { label: 'Lead', value: 'Lead' },
    { label: 'Principal', value: 'Principal' },
  ];

  const [filteredLevels, setFilteredLevels] = useState(levelsList);

  useEffect(() => {
    if (isOpen) {
      form.resetFields();
      setFilteredLevels(levelsList);
    }
  }, [isOpen, form]);

  const handleEmployeeChange = (selectedEmployeeId) => {
    const employee = dataEmployee?.find(
      (emp) => String(emp._id || emp.id) === String(selectedEmployeeId)
    );

    if (employee) {
      let deptName = 'Chưa cập nhật';
      if (employee.department) {
        if (typeof employee.department === 'object' && employee.department.name) {
          deptName = employee.department.name;
        } else {
          const matchedDepartment = dataDepartment?.find(
            (dept) => String(dept._id || dept.id) === String(employee.department)
          );
          if (matchedDepartment) deptName = matchedDepartment.name;
        }
      }

      let posName = 'Chưa cập nhật';
      if (employee.position) {
        if (typeof employee.position === 'object' && employee.position.name) {
          posName = employee.position.name;
        } else {
          const matchedPosition = dataPosition?.find(
            (pos) => String(pos._id || pos.id) === String(employee.position)
          );
          if (matchedPosition) posName = matchedPosition.name;
        }
      }

      const currentLevel = employee.level || 'Intern';

      form.setFieldsValue({
        currentPosition: posName,
        currentDepartment: deptName,
        currentLevel: currentLevel,
        proposedLevel: undefined,
      });

      const levelHierarchy = ['Intern', 'Fresher', 'Junior', 'Middle', 'Senior', 'Lead', 'Principal'];
      const currentIndex = levelHierarchy.indexOf(currentLevel);

      const available = levelsList.filter((item) => {
        const itemIndex = levelHierarchy.indexOf(item.value);
        return itemIndex > currentIndex;
      });

      setFilteredLevels(available);
    } else {
      form.resetFields();
      setFilteredLevels(levelsList);
    }
  };

  const onFinish = (values) => {
    console.log("Giá trị ngày trước khi format:", values.effectiveDate);

    const formattedValues = {
      ...values,
      effectiveDate: values.effectiveDate && typeof values.effectiveDate.format === 'function'
        ? values.effectiveDate.format('YYYY-MM-DD') 
        : values.effectiveDate,
    };

    if (onSubmitPromotion) {
      onSubmitPromotion(formattedValues);
    }
    onClose();
  };

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
            onFinish={onFinish}
            requiredMark={false}
            className="space-y-2"
            initialValues={{
              promotionType: 'Vertical',
              currentDepartment: '',
              currentPosition: '',
              currentLevel: '',
              effectiveDate: null 
            }}
          >
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="employeeId"
                  label="Chọn nhân sự"
                  rules={[{ required: true, message: 'Vui lòng chọn nhân sự cần đề xuất!' }]}
                >
                  <Select
                    placeholder="-- Chọn nhân viên --"
                    onChange={handleEmployeeChange}
                    options={dataEmployee?.map((emp) => ({
                      label: `${emp.fullName} (${emp.email || emp.code})`,
                      value: emp._id || emp.id,
                    }))}
                    showSearch
                    optionFilterProp="label"
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item name="currentDepartment" label="Phòng ban hiện tại">
                  <Input disabled placeholder="Tự động hiển thị" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item name="currentPosition" label="Vị trí hiện tại">
                  <Input disabled placeholder="Tự động hiển thị" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item name="currentLevel" label="Cấp bậc hiện tại">
                  <Input disabled placeholder="Tự động hiển thị" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="effectiveDate"
                  label="Ngày có hiệu lực"
                  rules={[{ required: true, message: 'Vui lòng chọn ngày có hiệu lực!' }]}
                >
                  <DatePicker
                    placeholder="Chọn ngày có hiệu lực"
                    className="w-full"
                    format="YYYY-MM-DD"
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="proposedLevel"
                  label="Cấp bậc đề xuất thăng tiến"
                  rules={[{ required: true, message: 'Vui lòng chọn cấp bậc muốn hướng tới!' }]}
                >
                  <Select
                    placeholder="-- Chọn cấp bậc --"
                    options={filteredLevels}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item name="promotionType" label="Hình thức thăng tiến">
                  <Select
                    options={[
                      { label: 'Thăng tiến dọc (Vertical - Lên bậc)', value: 'Vertical' },
                      { label: 'Chuyển ngang (Lateral)', value: 'Lateral' },
                      { label: 'Dựa trên hiệu suất (Merit-based)', value: 'Merit-based' },
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button type="primary" htmlType="submit">
                Tạo đề xuất
              </Button>
            </div>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}