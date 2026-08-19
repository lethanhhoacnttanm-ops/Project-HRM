import React, { useState, useEffect, useCallback } from "react";
import { PlusCircle } from "lucide-react";
import PromotionStats from "../../../components/admin/Promotion/PromotionStats.jsx";
import PromotionTabs from "../../../components/admin/Promotion/PromotionTabs.jsx";
import PromotionTable from "../../../components/admin/Promotion/PromotionTable.jsx";
import PromotionModal from "../../../components/admin/Promotion/PromotionModal.jsx";
import DepartmentDistribution from "../../../components/admin/Promotion/DepartmentDistribution.jsx";
import PerformanceInsightCard from "../../../components/admin/Promotion/PerformanceInsightCard.jsx";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Button } from "@/components/ui/button"

import { employeeService } from '../../../services/employee.service.js';
import { positionService } from "@/services/position.service.js";
import { departmentService } from "@/services/department.service.js";
import { promotionService } from "@/services/promotion.service.js";

import { toast } from "sonner";


export default function PromotionPage() {
  const [activeTab, setActiveTab] = useState("process");

  const [viewMode, setViewMode] = useState("table");

  const [dataEmployee, setDataEmployee] = useState([])
  const [dataDepartment, setDataDepartment] = useState([])
  const [dataPosition, setDataPosition] = useState([])
  const [dataPromotions, setDataPromotions] = useState([])

  const [pageNumber, setPageNumber] = useState(1);

  const [pageSize] = useState(5);

  const [paginationInfo, setPaginationInfo] = useState({ totalEmp: 0, totalPage: 1 });

  const [modalState, setModalState] = useState({ isOpen: false, mode: 'create', data: null });

  useEffect(() => {
    if (viewMode === "table") {
      const fetchEmployee = async () => {
        try {

          const res = await employeeService.getAllEmployees(pageNumber, pageSize, 'EMPLOYEE');
          if (res?.success) {
            setDataEmployee(res.dataEmp);
          } else {
            setDataEmployee([]);
          }
        } catch (error) {
          setDataEmployee([]);
          toast.error('Thất bại', {
            description: error.message || 'Không thể lấy danh sách nhân viên!',
          });
        }
      };

      fetchEmployee();
    }
  }, []);

  useEffect(() => {
    if (viewMode === "table") {
      const fetchPosition = async () => {
        try {
          const res = await positionService.getAllList();
          if (res?.success) {
            setDataPosition(res?.dataList);
          } else {
            setDataPosition([]);
          }
        } catch (error) {
          toast.error('Thất bại', {
            description: error.message || 'Không thể lấy danh sách vị trí cho phòng ban!',
          });
        }
      };

      fetchPosition();
    }
  }, []);

  useEffect(() => {
    if (viewMode === "table") {
      const fetchDepartment = async () => {
        try {
          const res = await departmentService.getAllList();
          if (res?.success) {
            setDataDepartment(res?.dataList);
          } else {
            setDataDepartment([]);
          }
        } catch (error) {
          toast.error('Thất bại', {
            description: error.message || 'Không thể lấy danh sách phòng ban!',
          });
        }
      };

      fetchDepartment();
    }
  }, []);

  const getStatusByTab = (tab) => {
    switch (tab) {
      case "process":
        return "PENDING_REVIEW"; 
      case "eligibility":
        return "APPROVED_PENDING_EFFECTIVE"; 
      case "history":
        return "WAITING";   
      default:
        return "PENDING_REVIEW";
    }
  };

  const fetchPromotions = useCallback(async () => {
    try {
      const statusQuery = getStatusByTab(activeTab);
      const res = await promotionService.getAllPromotion(pageNumber, pageSize, statusQuery);
      if (res?.success) {
        setDataPromotions(res.dataPromotions);
        setPaginationInfo(res.pagination || { totalEmp: 0, totalPage: 1 });
      } else {
        setDataPromotions([]);
      }
    } catch (error) {
      setDataPromotions([]);
      toast.error('Thất bại', {
        description: error.message || 'Không thể lấy danh sách nhân viên!',
      });
    }
  }, [activeTab, pageNumber, pageSize]);

  useEffect(() => {
    fetchPromotions();
  }, [fetchPromotions]);

  const handleCreatePromotion = async (formValues) => {
    try {
      const payload = {
        employeeId: formValues.employeeId,
        currentDepartment: formValues.currentDepartment,
        currentPosition: formValues.currentPosition,
        currentLevel: formValues.currentLevel,
        proposedLevel: formValues.proposedLevel,
        promotionType: formValues.promotionType || 'Vertical'
      };

      await promotionService.createPromotion(payload);
      toast.success('Tạo đề xuất thăng tiến thành công!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra!');
    }
  };

  const handleCheckAndNextStep = async (promotionId, payload) => {
    try {

      const result = await promotionService.updatePromotionStatus(promotionId, payload);

      if (result.success) {
        toast.success("Cập nhật trạng thái và chuyển bước thành công!");
        
        fetchPromotions(); 
      }
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
      toast.error(error.message || "Không thể cập nhật trạng thái lúc này!");
    }
  };

  const handleOpenModal = (mode, data) => {
    setModalState({ isOpen: true, mode, data });
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, mode: 'create', data: null });
  };

  return (
    <div className="space-y-6 p-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Tiến độ thăng tiến
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Tổ chức và quản lý các phòng ban và cơ cấu đội nhóm trong công ty của bạn.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <HoverCard>
            <HoverCardTrigger
              delay={10}
              closeDelay={100}
              render={<Button variant="outline" className="font-bold">Xem Lộ Trình Thăng Tiến</Button>}
            />

            <HoverCardContent className="w-105 p-5 bg-indigo-50/95 dark:bg-indigo-950/95 backdrop-blur-md border-2 border-indigo-500/30 dark:border-indigo-900/50 shadow-xl rounded-2xl">
              <div>
                <h3 className="text-base font-bold text-indigo-700 dark:text-indigo-300 mb-4 pb-2 border-b border-indigo-200/50 dark:border-indigo-800/50">
                  Cấp bậc & Tiêu chuẩn thăng tiến
                </h3>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="w-28 flex justify-center shrink-0">
                    <span className="w-full text-center text-xs font-extrabold text-white bg-blue-500 border border-blue-300 px-2 py-1 shadow-sm [clip-path:polygon(10px_50%,0_0,100%_0,calc(100%-10px)_50%,100%_100%,0_100%)]">
                      Fresher
                    </span>
                  </div>
                  <span className="flex-1 text-[11px] font-semibold px-2.5 py-1 rounded-md bg-blue-100/80 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-right">
                    0-1 năm | 0-1 Dự án | ≥ 3/5 ⭐
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="w-28 flex justify-center shrink-0">
                    <span className="w-full text-center text-xs font-extrabold text-white bg-teal-500 border border-teal-300 px-2 py-1 shadow-sm [clip-path:polygon(10px_50%,0_0,100%_0,calc(100%-10px)_50%,100%_100%,0_100%)]">
                      Junior
                    </span>
                  </div>
                  <span className="flex-1 text-[11px] font-semibold px-2.5 py-1 rounded-md bg-teal-100/80 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 text-right">
                    1-2 năm | 2+ Dự án | ≥ 3.5/5 ⭐
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="w-28 flex justify-center shrink-0">
                    <span className="w-full text-center text-xs font-extrabold text-white bg-emerald-600 border border-emerald-400 px-2 py-1 shadow-sm [clip-path:polygon(10px_50%,0_0,100%_0,calc(100%-10px)_50%,100%_100%,0_100%)]">
                      Middle
                    </span>
                  </div>
                  <span className="flex-1 text-[11px] font-semibold px-2.5 py-1 rounded-md bg-emerald-100/80 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-right">
                    3-5 năm | 4+ Dự án | ≥ 4/5 ⭐
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="w-28 flex justify-center shrink-0">
                    <span className="w-full text-center text-xs font-extrabold text-white bg-purple-600 border border-purple-400 px-2 py-1 shadow-sm [clip-path:polygon(10px_50%,0_0,100%_0,calc(100%-10px)_50%,100%_100%,0_100%)]">
                      Senior
                    </span>
                  </div>
                  <span className="flex-1 text-[11px] font-semibold px-2.5 py-1 rounded-md bg-purple-100/80 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 text-right">
                    5+ năm | 6+ Dự án (Chính) | ≥ 4.5/5 ⭐
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="w-28 flex justify-center shrink-0">
                    <span className="w-full text-center text-xs font-extrabold text-white bg-rose-600 border border-rose-400 px-2 py-1 shadow-sm [clip-path:polygon(10px_50%,0_0,100%_0,calc(100%-10px)_50%,100%_100%,0_100%)]">
                      Lead
                    </span>
                  </div>
                  <span className="flex-1 text-[11px] font-semibold px-2.5 py-1 rounded-md bg-rose-100/80 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-right">
                    7+ năm | 8+ Dự án & Quản lý | ≥ 4.5/5 ⭐
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="w-28 flex justify-center shrink-0">
                    <span className="w-full text-center text-xs font-extrabold text-gray-900 bg-amber-400 border border-amber-200 px-2 py-1 shadow-sm [clip-path:polygon(10px_50%,0_0,100%_0,calc(100%-10px)_50%,100%_100%,0_100%)]">
                      Principal
                    </span>
                  </div>
                  <span className="flex-1 text-[11px] font-semibold px-2.5 py-1 rounded-md bg-amber-100/80 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-right">
                    10+ năm | 12+ Doanh nghiệp | 5/5 ⭐
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 pt-2 border-t border-indigo-200/40 dark:border-indigo-800/60">
                  <div className="w-28 flex justify-center shrink-0">
                    <span className="w-full text-center text-xs font-extrabold text-white bg-slate-500 border border-slate-300 px-2 py-1 shadow-sm [clip-path:polygon(10px_50%,0_0,100%_0,calc(100%-10px)_50%,100%_100%,0_100%)]">
                      Intern
                    </span>
                  </div>
                  <span className="flex-1 text-[11px] font-semibold px-2.5 py-1 rounded-md bg-slate-100/80 dark:bg-slate-900/40 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 text-right">
                    Dưới 1 năm | Làm quen & Hỗ trợ task
                  </span>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
          <Button
            onClick={() => handleOpenModal('create', dataEmployee)}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-md transition-all self-start sm:self-auto cursor-pointer border-0"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Tạo đề xuất thăng tiến</span>
          </Button>
        </div>
      </div>

      <PromotionStats />

      <div className="rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <PromotionTabs activeTab={activeTab} setActiveTab={(tab) => { setActiveTab(tab); setPageNumber(1); }} />
        <PromotionTable onSubmitUpdatePromotion={handleCheckAndNextStep} activeTab={activeTab} dataPromotions={dataPromotions} pagination={paginationInfo} pageSize={pageSize} pageNumber={pageNumber} setPageNumber={setPageNumber}/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DepartmentDistribution />
        </div>
        <div className="lg:col-span-1">
          <PerformanceInsightCard />
        </div>
      </div>

      <PromotionModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        mode={modalState.mode}
        dataEmployee={modalState.data}
        dataDepartment={dataDepartment}
        dataPosition={dataPosition}

        onSubmitPromotion={handleCreatePromotion}
      />
    </div>
  );
}