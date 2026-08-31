import React, { useState, useEffect } from "react";
import { Download, Plus } from "lucide-react";

import BenefitStats from "../../../components/admin/Benefit/BenefitStats.jsx";
import BenefitTabs from "../../../components/admin/Benefit/BenefitTabs.jsx";
import ProgramListView from "../../../components/admin/Benefit/views/ProgramListView.jsx";
import RegistrationManageView from "../../../components/admin/Benefit/views/RegistrationManageView.jsx";
import BenefitStructureChart from "../../../components/admin/Benefit/BenefitStructureChart.jsx";
import BenefitNotificationsWidget from "../../../components/admin/Benefit/BenefitNotificationsWidget.jsx";
import BenefitSupportWidget from "../../../components/admin/Benefit/BenefitSupportWidget.jsx";
import BenefitModal from "../../../components/admin/Benefit/BenefitModal.jsx";
import { Button } from "@/components/ui/button";

import { benefitService } from "@/services/benefit.service.js";
import { employeeService } from "@/services/employee.service.js";

import { toast } from "sonner";

export default function BenefitsPage() {
  const [activeTab, setActiveTab] = useState("programs");
  const [modalState, setModalState] = useState({ isOpen: false, mode: "create" });
  const [data, setData] = useState([]);
  const [actionLoading, setActionLoading] = useState(false);
  const [employees, setEmployees] = useState([]);

  const openModal = (mode, data) => setModalState({ isOpen: true, mode, data });
  const closeModal = () => setModalState({ isOpen: false, mode: "create", data: null });

  const [loading, setLoading] = useState(false);

  const fetchBenefits = async () => {
    try {
      setLoading(true);
      const res = await benefitService.getBenefits();
      if (res && res.success) {
        setData(res.data);
      }
    } catch (error) {
      toast.error('Không thể tải danh sách phúc lợi!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBenefits();
  }, []);

  const fetchDataEmp = async () => {
    try {
      setActionLoading(true)
      const res = await employeeService.getAllDataEmpForBenefit('EMPLOYEE');
      if (res?.success) {
        setEmployees(res.dataEmp);
      } else {
        setEmployees([]);
      }
    } catch (error) {
      setEmployees([]);
      toast.error('Thất bại', {
        description: error.message || 'Không thể lấy danh sách nhân viên!',
      });
    } finally {
      setActionLoading(false)
    }
  };

  useEffect(() => {

    fetchDataEmp();
  }, []);

  const handleFormSubmit = async (values, mode, currentRecord) => {
    try {
      setActionLoading(true);

      if (mode === 'create') {
        const res = await benefitService.createBenefit(values);
        if (res && res.success) {
          toast.success('Tạo chính sách phúc lợi thành công!');
          fetchBenefits();
          closeModal();
        }
      } else if (mode === 'edit') {
        const res = await benefitService.updateBenefit(currentRecord._id, values);
        if (res && res.success) {
          toast.success('Cập nhật chính sách thành công!');
          fetchBenefits();
          closeModal();
        }
      } else if (mode === 'assign') {
        const res = await benefitService.assignEmployees(currentRecord._id, values);
        if (res && res.success) {
          toast.success('Phân bổ phúc lợi cho nhân viên thành công!');
          fetchBenefits();
          closeModal();
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra!');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteBenefit = async (id) => {
    try {
      await benefitService.deleteBenefit(id);
      toast.success('Xóa chính sách thành công!');
      fetchBenefits();
    } catch (error) {
      toast.error('Xóa thất bại!');
    }
  };

  return (
    <div className="space-y-6 p-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Chính sách phúc lợi
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Quản lý các chương trình bảo hiểm, phụ cấp và đãi ngộ nhân viên.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => openModal("export")}
            className="flex items-center gap-2 border-slate-300 text-slate-700 font-semibold text-xs px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 shadow-sm"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Xuất báo cáo</span>
          </Button>

          <Button
            onClick={() => openModal("create")}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm chương trình mới</span>
          </Button>
        </div>
      </div>

      <BenefitStats />

      <div className="w-full space-y-6">
        <div className="w-full rounded-2xl border border-slate-200 overflow-hidden shadow-sm p-6 space-y-6 bg-white">
          <BenefitTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          {activeTab === "programs" && (
            <ProgramListView
              data={data}
              loading={loading}
              onAction={(actionType, record) => {
                if (actionType === 'assign') openModal('assign', record);
                if (actionType === 'edit') openModal('edit', record);
                if (actionType === 'delete') handleDeleteBenefit(record._id);
              }}
            />
          )}
          {activeTab === "registrations" && <RegistrationManageView />}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <BenefitStructureChart />
          <BenefitNotificationsWidget />
          <BenefitSupportWidget />
        </div>
      </div>

      <BenefitModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        mode={modalState.mode}
        data={modalState.data}
        loading={actionLoading}
        onSubmit={handleFormSubmit}
        dataOption={employees}
        fetchDataEmp={fetchDataEmp}
      />
    </div>
  );
}