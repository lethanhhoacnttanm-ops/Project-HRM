import React, { useState, useEffect } from "react";
import { Download, Plus, Bell } from "lucide-react";

import NotificationStats from "../../../components/admin/Notifications/NotificationStats.jsx";
import NotificationFilter from "../../../components/admin/Notifications/NotificationFilter.jsx";
import NotificationTable from "../../../components/admin/Notifications/NotificationTable.jsx";
import RecentActivityWidget from "../../../components/admin/Notifications/RecentActivityWidget.jsx";
import FeaturedPreviewWidget from "../../../components/admin/Notifications/FeaturedPreviewWidget.jsx";
import SupportCardWidget from "../../../components/admin/Notifications/SupportCardWidget.jsx";
import NotificationModal from "../../../components/admin/Notifications/NotificationModal.jsx";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";
import { notificationService } from "@/services/notification.service.js";
import { employeeService } from "@/services/employee.service.js";

export default function NotificationPage() {
  const [selectedType, setSelectedType] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [modalState, setModalState] = useState({ isOpen: false, mode: "create", data: null });

  const openModal = (mode, data) => setModalState({ isOpen: true, mode, data });
  const closeModal = () => setModalState({ isOpen: false, mode: "create", data: null });

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  const [notificationStats, setNotificationStats] = useState({
    totalSent: 0,
    activeCount: 0,
    upcomingCount: 0,
    readRate: "0%",
  });

  useEffect(() => {
    const fetchNotificationStats = async () => {
      try {
        const [resNotification, resEmployee] = await Promise.all([
          notificationService.getNotificationsNoPaging(),
          employeeService.getAllDataEmpForBenefit("EMPLOYEE")
        ]);
        if (resEmployee.success && resNotification.success) {
          const list = resNotification.dataNotifications || [];
          const employees = resEmployee.dataEmp || [];

          const sentList = list.filter(item => item.status === 'Đã gửi');
          const totalSent = sentList.length;

          const activeCount = sentList.length;

          const upcomingList = list.filter(item => item.status === 'Đang chờ');
          const upcomingCount = upcomingList.length;

          let totalReadPercentage = 0;
          const totalCompanyEmployees = employees.length;
          if (sentList.length > 0) {
            const sumRates = sentList.reduce((acc, curr, index) => {

              const readCount = curr.readCount || 0;
              const rate = totalCompanyEmployees > 0 ? (readCount / totalCompanyEmployees) * 100 : 0;

              return acc + rate;
            }, 0);

            totalReadPercentage = Math.round(sumRates / sentList.length);
          }

          setNotificationStats({
            totalSent: list.length,
            activeCount: activeCount,
            upcomingCount: upcomingCount,
            readRate: `${totalReadPercentage}%`,
          });
        }
      } catch (error) {
        console.error("Lỗi lấy thống kê thông báo:", error);
      }
    };

    fetchNotificationStats();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await notificationService.getAll();
      if (res && res.success) {
        setNotifications(res.data);
      }
    } catch (error) {
      toast.error('Không thể tải danh sách thông báo!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleFormSubmit = async (values, mode) => {
    try {
      if (mode === 'create') {
        const res = await notificationService.create(values);
        if (res && res.success) {
          toast.success('Tạo thông báo thành công!');
          fetchNotifications();
          closeModal();
        }
      } else if (mode === 'edit') {
        const res = await notificationService.update(modalState.currentRecord._id, values);
        if (res && res.success) {
          toast.success('Cập nhật thông báo thành công!');
          fetchNotifications();
          closeModal();
        }
      } else if (mode === 'delete') {
        const res = await notificationService.delete(values);
        if (res && res.success) {
          toast.success('Xóa thông báo thành công!');
          fetchNotifications();
          closeModal();
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra!');
    }
  };

  const filteredNotifications = notifications.filter((item) => {
    const matchType = selectedType === 'ALL' || item.type === selectedType;
    const matchStatus = selectedStatus === 'ALL' || item.status === selectedStatus;
    return matchType && matchStatus;
  });

  const handleResetFilter = () => {
    setSelectedType('ALL');
    setSelectedStatus('ALL');
  };

  return (
    <div className="p-6 space-y-6 bg-slate-50/50 dark:bg-slate-950 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
            <Bell className="size-6 text-indigo-600 dark:text-indigo-400" />
            Quản lý Thông báo
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Lập lịch và quản lý các thông báo nội bộ cho toàn bộ nhân viên trong tổ chức.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => openModal("export")}
            className="flex items-center gap-2 border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm"
          >
            <Download className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            <span>Xuất báo cáo</span>
          </Button>

          <Button
            onClick={() => openModal("create")}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Tạo thông báo mới</span>
          </Button>
        </div>
      </div>

      <NotificationStats statsData={notificationStats} />

      <div className="w-full space-y-6">
        <div className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm p-6 space-y-6 bg-white dark:bg-slate-900">
          <NotificationFilter
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            onReset={handleResetFilter}
          />
          <NotificationTable
            data={filteredNotifications}
            loading={loading}
            onEdit={(record) => openModal('edit', record)}
            onDelete={(record) => openModal('delete', record)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <RecentActivityWidget />
          <FeaturedPreviewWidget />
          <SupportCardWidget />
        </div>
      </div>

      <NotificationModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        mode={modalState.mode}
        record={modalState.data}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}