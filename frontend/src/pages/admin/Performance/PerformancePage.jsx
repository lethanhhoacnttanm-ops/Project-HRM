import React, { useState, useEffect, useCallback } from "react";
import { PlusCircle } from "lucide-react";

import PerformanceStats from "../../../components/admin/Performance/PerformanceStats.jsx";
import PerformanceTabs from "../../../components/admin/Performance/PerformanceTabs.jsx";
import PerformanceTable from "../../../components/admin/Performance/PerformanceTable.jsx";
import RecentActivityWidget from "../../../components/admin/Performance/RecentActivityWidget.jsx";
import DistributionWidget from "../../../components/admin/Performance/DistributionWidget.jsx";
import TopEmployeesWidget from "../../../components/admin/Performance/TopEmployeesWidget.jsx";
import PerformanceModal from "../../../components/admin/Performance/PerformanceModal.jsx";
import TeamPerformanceTable from "@/components/admin/Performance/TeamPerformanceTable.jsx";
import PersonalKPIGuidelineTab from "@/components/admin/Performance/PersonalKPIGuidelineTab.jsx";
import { Button } from "@/components/ui/button";

import { employeeService } from "@/services/employee.service.js";
import { performanceService } from "@/services/performance.service.js";

import { toast } from "sonner";

export default function PerformancePage() {
  const [loading, setLoading] = useState(true)
  const [teamData, setTeamData] = useState([]);
  const [activeTab, setActiveTab] = useState("cycle");
  const [modalState, setModalState] = useState({ isOpen: false, mode: "create" });

  const [dataAllListEmp, setDataAllListEmp] = useState([])

  const [dataPerformance, setDataPerformance] = useState([])
  const [performanceNumber, setPerformanceNumber] = useState(1);
  const [performancePagination, setPerformancePagination] = useState({ totalPeformance: 0, totalPage: 1 });
  const pageSize = 4

  const openModal = (mode, data) => setModalState({ isOpen: true, mode, data });
  const closeModal = () => setModalState({ isOpen: false, mode: "create", data: null });

  useEffect(() => {
    const fetchListEmp = async () => {
      try {
        const res = await employeeService.getAllListEmp();
        if (res && res.success) {
          setDataAllListEmp(res.dataListEmp || []);
        } else {
          setDataAllListEmp([]);
        }
      } catch (error) {
        setDataAllListEmp([]);
        toast.error('Thất bại', {
          description: error.message || 'Không thể lấy danh sách toàn bộ nhân viên!',
        });
      }
    }

    fetchListEmp()
  }, [])

  const fetchTeamPerformance = async () => {
    try {
      setLoading(true);
      const res = await performanceService.getTeamPerformanceSummary();

      if (res.success) {
        setTeamData(res.data);
      }
    } catch (error) {
      toast.error(error.message || 'Không thể tải dữ liệu hiệu suất nhóm!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamPerformance();
  }, []);


  const fetchPerformancesList = useCallback(async () => {
    try {
      const res = await performanceService.FindWithPagination(performanceNumber, pageSize);
      if (res && res.success) {
        setDataPerformance(res.dataPerformance || []);

        if (res.pagination) {
          setPerformancePagination(res.pagination);
        }
      } else {
        setDataPerformance([]);
      }
    } catch (error) {
      setDataPerformance([]);
      toast.error('Thất bại', {
        description: error.message || 'Không thể lấy danh sách đánh giá hiệu xuất!',
      });
    } finally {
      setLoading(false);
    }
  }, [performanceNumber, pageSize])

  useEffect(() => {
    fetchPerformancesList(performanceNumber);
  }, [performanceNumber]);

  // const handleFormSubmit = async (values) => {
  //   try {
  //     const res = await performanceService.createPerformanceApi(values);


  //     if (res && res.success) {

  //       toast.success('Đã tạo đánh giá thành công!');
  //       setModalState({ isOpen: false })
  //       fetchPerformancesList();
  //     }
  //   } catch (error) {
  //     toast.error(error.message || 'Có lỗi xảy ra!');
  //   }
  // };

  const handleFinish = async (values) => {
    try {
      setLoading(true);
      await performanceService.createCycleApi(values.quarter);

      toast.success(`Đã mở thành công chu kỳ ${values.quarter} cho toàn công ty!`);
      closeModal()
      fetchPerformancesList();
    } catch (error) {
      toast.error(error.response?.data?.message || "Lỗi khi tạo chu kỳ mới!");
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetail = (departmentItem) => {
    console.log("Xem chi tiết phòng ban:", departmentItem);
  };

  return (
    <div className="space-y-6 p-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Đánh giá hiệu suất
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Theo dõi hiệu suất nhân viên, chỉ số KPI và các chu kỳ đánh giá.
          </p>
        </div>

        <Button
          onClick={() => openModal("create")}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Bắt đầu chu kỳ mới</span>
        </Button>
      </div>

      <PerformanceStats />

      <div className="space-y-6">
        <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm bg-white p-6 space-y-6 w-full">
          <PerformanceTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {activeTab === "cycle" && (
            <PerformanceTable
              dataPerformance={dataPerformance}
              pageNumber={performanceNumber}
              pageSize={4}
              setPageNumber={setPerformanceNumber}
              pagination={performancePagination}
            />
          )}
          {activeTab === "team" && <TeamPerformanceTable data={teamData} onViewDetail={handleViewDetail} />}
          {activeTab === "kpi" && <PersonalKPIGuidelineTab />}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentActivityWidget />
          <DistributionWidget />
        </div>

        <div>
          <TopEmployeesWidget />
        </div>
      </div>

      {modalState.isOpen && (
        <PerformanceModal
          isOpen={modalState.isOpen}
          onClose={closeModal}
          mode={modalState.mode}
          dataListEmp={dataAllListEmp}
          onSubmit={handleFinish}
        />
      )}
    </div>
  );
}