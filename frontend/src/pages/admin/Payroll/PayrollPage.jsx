import React, { useState, useEffect } from "react";
import { Download, CheckCircle } from "lucide-react";

import PayrollStats from "../../../components/admin/Payroll/PayrollStats.jsx";
import PayrollTabs from "../../../components/admin/Payroll/PayrollTabs.jsx";
import MonthlyPayrollView from "../../../components/admin/Payroll/views/MonthlyPayrollView.jsx";
import BonusCommissionView from "../../../components/admin/Payroll/views/BonusCommissionView.jsx";
import SalaryStructureView from "../../../components/admin/Payroll/views/SalaryStructureView.jsx";
import DepartmentCostChart from "../../../components/admin/Payroll/DepartmentCostChart.jsx";
import CostOptimizationCard from "../../../components/admin/Payroll/CostOptimizationCard.jsx";
import ImportantNoticeWidget from "../../../components/admin/Payroll/ImportantNoticeWidget.jsx";
import PayrollModal from "../../../components/admin/Payroll/PayrollModal.jsx";
import { Button } from "@/components/ui/button";
import { contractService } from "@/services/contract.service.js";

import { toast } from "sonner";
import { payrollService } from "@/services/payroll.service.js";

export default function PayrollPage() {
  const [activeTab, setActiveTab] = useState("monthly");
  const [modalState, setModalState] = useState({ isOpen: false, mode: "lock" });

  const [contracts, setContracts] = useState([]);
  const [payrollList, setPayrollList] = useState([]);
  const [loading, setLoading] = useState(false);

  const openModal = (mode, data) => setModalState({ isOpen: true, mode, data });
  const closeModal = () => setModalState({ isOpen: false, mode: "lock" });

  const currentMonthYear = "08-2026";

  const [selectedPayroll, setSelectedPayroll] = useState(null);

  useEffect(() => {
    const fetchContract = async () => {
      try {
        const res = await contractService.getListContract();
        if (res?.success) {
          setContracts(res?.data)
        }
      } catch (error) {
        setContracts([])
        toast.error('Thất bại', { description: 'Không thể lấy danh sách các hợp đồng!' });
      } finally {
        setLoading(false)
      }
    }
    fetchContract()
  }, [])

  const fetchPayrollData = async () => {
    try {
      setLoading(true);
      const res = await payrollService.getPayrollsApi(currentMonthYear);
      setPayrollList(res.data || []);
    } catch (error) {
      console.error("Lỗi lấy danh sách lương:", error);
      toast.error("Không thể tải bảng lương kỳ này!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayrollData();
  }, [currentMonthYear]);

  const handleSavePayroll = async (payload, payrollId) => {
    try {
      setLoading(true);

      if (payrollId) {
        await payrollService.updatePayrollApi(payrollId, payload);
        toast.success("Cập nhật phiếu lương thành công!");
      } else {
        await payrollService.createPayrollApi(payload);
        toast.success("Tạo phiếu lương thành công!");
      }

      closeModal()
      fetchPayrollData();
    } catch (error) {
      console.error("Lỗi lưu phiếu lương:", error);
      const errorMsg = error.response?.data?.message || error.message || "Có lỗi xảy ra khi lưu phiếu lương!";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleLock = async (payrollId, newLockStatus) => {
    try {
      await payrollService.toggleLockApi(payrollId, newLockStatus);
      toast.success(newLockStatus ? "Đã khóa phiếu lương thành công!" : "Đã mở khóa phiếu lương!");

      fetchPayrollData();
    } catch (error) {
      console.error("Lỗi khóa/mở khóa phiếu lương:", error);
      toast.error(error.response?.data?.message || "Không thể thay đổi trạng thái khóa!");
    }
  };

  const handleLockMonth = async (monthYear) => {
    try {
      setLoading(true);
      await payrollService.lockMonthApi(monthYear);

      toast.success(`Đã khóa thành công bảng lương Tháng ${monthYear}!`);
      closeModal()
      fetchPayrollData();
    } catch (error) {
      console.error("Lỗi khóa bảng lương:", error);
      toast.error(error.response?.data?.message || "Không thể khóa bảng lương kỳ này!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Quản lý Lương & Thưởng
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Theo dõi và xử lý bảng lương, thưởng hàng tháng của nhân viên.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => openModal("export")}
            className="flex items-center gap-2 border-slate-300 text-slate-700 font-semibold text-xs px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 shadow-sm"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Xuất báo cáo (Excel)</span>
          </Button>

          <Button
            onClick={() => openModal("lock")}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Chốt bảng lương tháng</span>
          </Button>
        </div>
      </div>

      <PayrollStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-slate-200 dark:border-gray-800 overflow-hidden shadow-sm bg-white dark:bg-gray-900 p-6 space-y-6">
            <PayrollTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === "monthly" && <MonthlyPayrollView onOpenModal={openModal} payrollData={payrollList} onToggleLock={handleToggleLock} />}
            {activeTab === "bonus" && <BonusCommissionView />}
            {activeTab === "structure" && <SalaryStructureView />}
          </div>

          <CostOptimizationCard />
        </div>

        <div className="lg:col-span-1 space-y-6">
          <DepartmentCostChart />
          <ImportantNoticeWidget />
        </div>
      </div>

      <PayrollModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        mode={modalState.mode}
        dataContract={contracts}
        onSubmit={handleSavePayroll}
        onConfirm={handleLockMonth}
        loading={loading}
        monthYear={currentMonthYear}

        dataAdjust={modalState.data}
      />
    </div>
  );
}