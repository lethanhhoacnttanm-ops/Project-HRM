import React, { useMemo, useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  Calendar,
  DollarSign,
  TrendingUp,
  Headphones,
  BarChart3,
  Bell,
  Settings,
  User,
  FileText,
  Building2,
  GraduationCap,
  CalendarDays,
  Trophy,
  Heart,
  MessageSquare,
  Wrench,
  ShieldCheck,
  UserCheck
} from "lucide-react";

const items = [
  {
    key: '/admin-page/dashboard',
    icon: <LayoutDashboard className="h-4 w-4" />,
    label: 'Tổng quan',
  },
  {
    key: 'sub-personnel',
    icon: <Users className="h-4 w-4" />,
    label: 'Nhân sự',
    children: [
      { key: '/admin-page/employees', icon: <UserCheck className="h-4 w-4" />, label: 'Hồ sơ nhân viên' },
      { key: '/admin-page/contracts', icon: <FileText className="h-4 w-4" />, label: 'Hợp đồng lao động' },
      { key: '/admin-page/promotion', icon: <TrendingUp className="h-4 w-4" />, label: 'Thăng tiến' },
      { key: '/admin-page/department', icon: <Building2 className="h-4 w-4" />, label: 'Phòng ban' }
    ],
  },
  {
    key: 'sub-talent',
    icon: <UserPlus className="h-4 w-4" />,
    label: 'Tuyển dụng & Đào tạo',
    children: [
      { key: '/admin-page/recruitment', icon: <UserPlus className="h-4 w-4" />, label: 'Tuyển dụng nội bộ' },
      { key: '/admin-page/training', icon: <GraduationCap className="h-4 w-4" />, label: 'Khóa học & Đào tạo' },
    ],
  },
  {
    key: 'sub-operations',
    icon: <Calendar className="h-4 w-4" />,
    label: 'Vận hành & Chấm công',
    children: [
      { key: '/admin-page/attendance', icon: <Calendar className="h-4 w-4" />, label: 'Chấm công' },
      { key: '/admin-page/leave-requests', icon: <CalendarDays className="h-4 w-4" />, label: 'Quản lý nghỉ phép' },
      { key: '/admin-page/performance', icon: <Trophy className="h-4 w-4" />, label: 'Đánh giá hiệu suất' },
      { key: '/admin-page/benefits', icon: <Heart className="h-4 w-4" />, label: 'Chính sách phúc lợi' },
    ],
  },
  {
    key: 'sub-finance',
    icon: <DollarSign className="h-4 w-4" />,
    label: 'Lương & Báo cáo',
    children: [
      { key: '/admin-page/payroll', icon: <DollarSign className="h-4 w-4" />, label: 'Lương & Thưởng' },
      { key: '/admin-page/reports', icon: <BarChart3 className="h-4 w-4" />, label: 'Báo cáo & Thống kê' },
    ],
  },
  {
    key: 'sub-communication',
    icon: <MessageSquare className="h-4 w-4" />,
    label: 'Truyền thông & Hỗ trợ',
    children: [
      { key: '/admin-page/notifications', icon: <Bell className="h-4 w-4" />, label: 'Quản lý thông báo' },
      { key: '/admin-page/support-tickets', icon: <Headphones className="h-4 w-4" />, label: 'Yêu cầu hỗ trợ' },
    ],
  },
  {
    type: 'divider',
  },
  {
    key: 'sub-system',
    icon: <Settings className="h-4 w-4" />,
    label: 'Hệ thống & Cấu hình',
    children: [
      { key: '/admin-page/system-config', icon: <Wrench className="h-4 w-4" />, label: 'Cấu hình chung' },
      { key: '/admin-page/security-settings', icon: <ShieldCheck className="h-4 w-4" />, label: 'Quản lý bảo mật' },
    ],
  },
];

const getActiveKeys = (items, pathname) => {
  let selectedKey = pathname;
  let openKey = '';

  items.forEach((item) => {
    if (item.children) {
      const childMatch = item.children.find((child) =>
        pathname.startsWith(child.key)
      );
      if (childMatch) {
        selectedKey = childMatch.key;
        openKey = item.key;
      }
    } else if (item.key && pathname.startsWith(item.key) && item.key !== '/') {
      selectedKey = item.key;
    }
  });

  return { selectedKey, openKey };
};


const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { selectedKey, openKey } = useMemo(
    () => getActiveKeys(items, location.pathname),
    [location.pathname]
  );

  const [openSubmenu, setOpenSubmenu] = useState(openKey);

  useEffect(() => {
    if (openKey) {
      setOpenSubmenu(openKey);
    }
  }, [openKey]);

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0 shrink-0 select-none">
      <div className="h-16 px-6 flex items-center gap-2.5 border-b border-gray-50">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
          <img src="/hrm_system_logo.png" alt="Logo" className="w-full h-full object-contain" />
        </div>
        <span className="text-xl font-extrabold text-blue-600 tracking-tight">
          HRM System
        </span>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <Accordion
          type="single"
          value={openSubmenu}
          onValueChange={setOpenSubmenu}
          className="w-full space-y-1 border-none"
        >
          {items.map((item, index) => {
            if (item.type === 'divider') {
              return <div key={`divider-${index}`} className="my-3 border-t border-gray-100" />;
            }

            if (item.children) {
              const isSubActive = item.children.some((child) =>
                location.pathname.startsWith(child.key)
              );

              return (
                <AccordionItem
                  key={item.key}
                  value={item.key}
                  className="border-none"
                >
                  <AccordionTrigger
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors hover:no-underline hover:bg-slate-50 ${isSubActive ? 'text-blue-600 bg-blue-50/50' : 'text-gray-600'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="pt-1 pb-0 pl-4 space-y-1 border-none">
                    {item.children.map((child) => {
                      const isActive = location.pathname.startsWith(child.key);
                      return (
                        <NavLink
                          key={child.key}
                          to={child.key}
                          className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold no-underline! transition-colors ${isActive
                              ? 'bg-blue-600 text-white font-bold shadow-xs'
                              : 'text-gray-500 hover:text-gray-900 hover:bg-slate-50'
                            }`}
                        >
                          {child.icon}
                          <span>{child.label}</span>
                        </NavLink>
                      );
                    })}
                  </AccordionContent>
                </AccordionItem>
              );
            }

            const isActive = location.pathname.startsWith(item.key);
            return (
              <NavLink
                key={item.key}
                to={item.key}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${isActive
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-gray-600 hover:bg-slate-50'
                  }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </Accordion>
      </div>

      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100 text-blue-600 shrink-0">
            <User className="h-4 w-4" />
          </div>
          <div className="overflow-hidden">
            <div className="text-xs font-bold text-blue-600 leading-tight truncate">
              Quản trị viên
            </div>
            <div className="text-[10px] text-gray-400 truncate">
              Trưởng bộ quản trị hệ thống
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;