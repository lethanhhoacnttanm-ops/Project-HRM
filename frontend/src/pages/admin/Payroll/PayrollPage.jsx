import React, { useState, useEffect } from "react";
import { Download, CheckCircle, DollarSign } from "lucide-react";

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
  const [allYearPayrolls, setAllYearPayrolls] = useState([]);
  const [loading, setLoading] = useState(false);

  const [payrollStats, setPayrollStats] = useState({
    totalSalary: "0 VNĐ",
    totalBonus: "0 VNĐ",
    totalDeductions: "0 VNĐ",
    paymentStatusRate: "0% Đã chi",
  });

  const openModal = (mode, data) => setModalState({ isOpen: true, mode, data });
  const closeModal = () => setModalState({ isOpen: false, mode: "lock" });

  const [selectedMonth, setSelectedMonth] = useState("08-2026");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const [selectedPayroll, setSelectedPayroll] = useState(null);

  useEffect(() => {
    const fetchPayrollStats = async () => {
      try {
        const res = await payrollService.getPayrollsNoPaging();
        if (res && res.success) {
          const list = res.dataPayrolls || [];

          const totalNet = list.reduce((acc, curr) => acc + (curr.netSalary || 0), 0);
          const formattedSalary = totalNet >= 1e9
            ? `${(totalNet / 1e9).toFixed(1)} tỷ VNĐ`
            : `${(totalNet / 1e6).toFixed(1)} tr VNĐ`;

          const totalBonus = list.reduce((acc, curr) => acc + (curr.bonus || 0), 0);
          const formattedBonus = totalBonus >= 1e9
            ? `${(totalBonus / 1e9).toFixed(1)} tỷ VNĐ`
            : `${(totalBonus / 1e6).toFixed(1)} tr VNĐ`;

          const totalDeductions = list.reduce((acc, curr) => acc + (curr.deductions || 0), 0);
          const formattedDeductions = totalDeductions >= 1e9
            ? `${(totalDeductions / 1e9).toFixed(1)} tỷ VNĐ`
            : `${(totalDeductions / 1e6).toFixed(1)} tr VNĐ`;

          const lockedCount = list.filter(item => item.status === 'Đã chốt' || item.isLocked).length;
          const paidRate = list.length > 0 ? Math.round((lockedCount / list.length) * 100) : 0;

          setPayrollStats({
            totalSalary: totalNet > 0 ? formattedSalary : "0 VNĐ",
            totalBonus: totalBonus > 0 ? formattedBonus : "0 VNĐ",
            totalDeductions: totalDeductions > 0 ? formattedDeductions : "0 VNĐ",
            paymentStatusRate: `${paidRate}% Đã chi`,
          });
        }
      } catch (error) {
        console.error("Lỗi lấy thống kê lương thưởng:", error);
      }
    };

    fetchPayrollStats();
  }, []);

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
      const res = await payrollService.getPayrollsApi(selectedMonth);
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
  }, [selectedMonth]);

  const fetchAllYearData = async () => {
    try {
      const res = await payrollService.getPayrollsNoPaging();
      setAllYearPayrolls(res.dataPayrolls || []);
    } catch (error) {
      console.error("Lỗi lấy tất cả phiếu lương:", error);
    }
  };

  useEffect(() => {
    fetchAllYearData(); 
  }, []);

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

      const response = await payrollService.lockMonthApi(monthYear);

      toast.success(`Đã khóa thành công bảng lương Tháng ${monthYear}!`);
      closeModal();
      fetchPayrollData();
    } catch (error) {
      console.error("[Client Error] Bắt lỗi khi chốt lương:", error);
      console.error("[Client Error Detail] Response data:", error.response?.data);

      toast.error(error.response?.data?.message || "Không thể khóa bảng lương kỳ này!");
    } finally {
      setLoading(false);
    }
  };

  const filteredData = payrollList.filter((item) => {
    const fullName = item.employee?.fullName?.toLowerCase() || "";
    const code = item.employee?.code?.toLowerCase() || "";
    const term = searchTerm.toLowerCase();

    const matchesSearch = fullName.includes(term) || code.includes(term);
    const matchesStatus = selectedStatus === "all" || item.status === selectedStatus;
    const matchesMonth = item.monthYear === selectedMonth;

    return matchesSearch && matchesStatus && matchesMonth;
  });

  return (
    <div className="p-6 space-y-6 bg-slate-50/50 dark:bg-slate-950 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
            <DollarSign className="size-6 text-indigo-600 dark:text-indigo-400" />
            Quản lý Lương & Thưởng
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Theo dõi và xử lý bảng lương, thưởng hàng tháng của nhân viên.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => openModal("export")}
            className="flex items-center gap-2 border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm"
          >
            <Download className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            <span>Xuất báo cáo (Excel)</span>
          </Button>

          <Button
            onClick={() => openModal("lock")}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Chốt bảng lương tháng</span>
          </Button>
        </div>
      </div>
      <PayrollStats statsData={payrollStats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm bg-white dark:bg-slate-900 p-6 space-y-6">
            <PayrollTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === "monthly" && <MonthlyPayrollView searchTerm={searchTerm} selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} setSearchTerm={setSearchTerm} onOpenModal={openModal} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} filteredData={filteredData} onToggleLock={handleToggleLock} />}
            {activeTab === "bonus" && <BonusCommissionView />}
            {activeTab === "structure" && <SalaryStructureView filteredData={filteredData} selectedMonth={selectedMonth} fullPayrollData={allYearPayrolls} />}
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
        monthYear={selectedMonth}

        dataAdjust={modalState.data}
      />
    </div>
  );
}