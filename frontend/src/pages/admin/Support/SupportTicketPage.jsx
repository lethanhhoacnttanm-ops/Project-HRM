import React, { useState, useEffect } from "react";
import { SlidersHorizontal, Plus, Headphones } from "lucide-react";

import TicketStats from "../../../components/admin/Tickets/TicketStats.jsx";
import TicketFilter from "../../../components/admin/Tickets/TicketFilter.jsx";
import TicketTable from "../../../components/admin/Tickets/TicketTable.jsx";
import ResolutionTimeWidget from "../../../components/admin/Tickets/ResolutionTimeWidget.jsx";
import TicketCategoryChart from "../../../components/admin/Tickets/TicketCategoryChart.jsx";
import AiOptimizationWidget from "../../../components/admin/Tickets/AiOptimizationWidget.jsx";
import TicketModal from "../../../components/admin/Tickets/TicketModal.jsx";
import { Button } from "@/components/ui/button";

import { toast } from 'sonner'
import { supportService } from '@/services/support.service';

export default function SupportTicketPage() {
  const [searchText, setSearchText] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Tất cả');
  const [selectedPriority, setSelectedPriority] = useState('Tất cả');
  const [modalState, setModalState] = useState({ isOpen: false, mode: "create", data: null });

  const openModal = (mode, data) => setModalState({ isOpen: true, mode, data });
  const closeModal = () => setModalState({ isOpen: false, mode: "create", data: null });

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const [ticketStats, setTicketStats] = useState({
    totalTickets: 0,
    inProgressCount: 0,
    pendingResponseCount: 0,
    resolvedCount: 0,
    resolvedRate: 0,
  });

  useEffect(() => {
    const fetchTicketStats = async () => {
      try {
        const res = await supportService.getTicketsNoPaging();
        if (res && res.success) {
          const list = res.dataTickets || [];

          const totalTickets = list.length;

          const inProgressList = list.filter(item => item.status === 'Đang xử lý');
          const inProgressCount = inProgressList.length;

          const pendingResponseList = list.filter(item => item.status === 'Mở');
          const pendingResponseCount = pendingResponseList.length;

          const resolvedList = list.filter(item => item.status === 'Đã giải quyết' || item.status === 'Đóng');
          const resolvedCount = resolvedList.length;

          const resolvedRate = totalTickets > 0 ? Math.round((resolvedCount / totalTickets) * 100) : 0;

          setTicketStats({
            totalTickets: totalTickets,
            inProgressCount: inProgressCount,
            pendingResponseCount: pendingResponseCount,
            resolvedCount: resolvedCount,
            resolvedRate: resolvedRate,
          });
        }
      } catch (error) {
        console.error("Lỗi lấy thống kê yêu cầu hỗ trợ:", error);
      }
    };

    fetchTicketStats();
  }, []);

  const fetchAllTickets = async () => {
    try {
      setLoading(true);
      const res = await supportService.getAllTicketsForAdmin();
      setTickets(res.data || []);
    } catch (error) {
      toast.error('Không thể tải danh sách phiếu hỗ trợ');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTickets();
  }, []);

  const handleUpdateTicket = async (id, values) => {
    try {
      await supportService.updateTicketByAdmin(id, values);
      toast.success('Cập nhật phiếu hỗ trợ thành công!');
      closeModal();
      fetchAllTickets();
    } catch (error) {
      toast.error('Cập nhật thất bại', { description: error.message });
    }
  };

  const filteredTickets = tickets.filter((item) => {
    const matchText =
      item.ticketCode?.toLowerCase().includes(searchText.toLowerCase()) ||
      item.title?.toLowerCase().includes(searchText.toLowerCase()) ||
      item.employee?.fullName?.toLowerCase().includes(searchText.toLowerCase());

    const matchStatus = selectedStatus === 'Tất cả' || item.status === selectedStatus;
    const matchPriority = selectedPriority === 'Tất cả' || item.priority === selectedPriority;

    return matchText && matchStatus && matchPriority;
  });

  return (
    <div className="p-6 space-y-6 bg-slate-50/50 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Headphones className="size-6 text-indigo-600" />
            Yêu cầu hỗ trợ
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Quản lý và phản hồi các yêu cầu từ nhân viên trong hệ thống.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => openModal("filter")}
            className="flex items-center gap-2 border-slate-300 text-slate-700 font-semibold text-xs px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 shadow-sm"
          >
            <SlidersHorizontal className="w-4 h-4 text-slate-500" />
            <span>Lọc dữ liệu</span>
          </Button>

          <Button
            onClick={() => openModal("create")}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Tạo yêu cầu mới</span>
          </Button>
        </div>
      </div>

      <TicketStats statsData={ticketStats} />

      <div className="w-full space-y-6">
        <div className="w-full rounded-2xl border border-slate-200 overflow-hidden shadow-sm  space-y-6 bg-white">
          <TicketFilter
            searchText={searchText}
            setSearchText={setSearchText}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            selectedPriority={selectedPriority}
            setSelectedPriority={setSelectedPriority}
          />
          <TicketTable
            tickets={filteredTickets}
            loading={loading}
            onOpenModal={openModal}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ResolutionTimeWidget />
          <TicketCategoryChart />
          <AiOptimizationWidget />
        </div>
      </div>

      <TicketModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        mode={modalState.mode}
        ticket={modalState.data}
        onSubmit={handleUpdateTicket}
      />
    </div>
  );
}