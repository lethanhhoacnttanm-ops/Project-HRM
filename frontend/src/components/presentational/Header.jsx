import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';

import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { Search, Bell, User, LogOut, AlertTriangle } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const { user, setUser, handleLogout } = useAuth();

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const confirmLogout = async () => {
    try {
      setIsLoggingOut(true);
      if (handleLogout) await handleLogout();
    } catch (error) {
      console.error('Lỗi khi gọi API logout:', error);
    } finally {
      if (setUser) setUser(null);
      setIsLoggingOut(false);
      setIsLogoutModalOpen(false);
      navigate('/login', { replace: true });
    }
  };

  return (
    <>
      <header className="h-16 bg-white border-b dark:bg-gray-900 border-gray-100  dark:border-gray-800 px-6 flex items-center justify-between sticky top-0 z-10 transition-colors duration-300">
        <div className="w-80">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Tìm kiếm..."
              className="pl-9 pr-4 py-1.5 rounded-full bg-violet-50 border-0 text-sm focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-violet-300 shadow-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-500 hover:text-blue-600 rounded-full h-9 w-9"
          >
            <Bell className="h-5 w-5 dark:text-white" />
          </Button>

          <div className="h-6 w-px bg-gray-200" />

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-gray-50 transition-colors select-none outline-none cursor-pointer">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-bold text-blue-600 leading-tight">
                  {user?.name || 'Quản trị viên'}
                </div>
                <div className="text-[11px] text-gray-400 ">
                  {user?.role === 'ADMIN' ? 'Trưởng bộ quản trị hệ thống' : 'Nhân sự'}
                </div>
              </div>

              <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100 text-blue-600 font-semibold overflow-hidden shrink-0">
                {user?.avatar ? (
                  <img src={user.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <User className="h-5 w-5 text-blue-600" />
                )}
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56 rounded-xl p-1">
              <DropdownMenuGroup>
                <DropdownMenuLabel className="font-normal p-2">
                  <div className="font-semibold text-gray-800">{user?.name || 'Quản trị viên'}</div>
                  <div className="text-xs text-gray-400 font-normal truncate">{user?.email || 'admin@system.com'}</div>
                </DropdownMenuLabel>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => setIsLogoutModalOpen(true)}
                className="cursor-pointer gap-2 text-red-600 focus:text-red-600 focus:bg-red-50 rounded-lg"
              >
                <LogOut className="h-4 w-4" />
                <span>Đăng xuất</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <AlertDialog open={isLogoutModalOpen} onOpenChange={setIsLogoutModalOpen}>
        <AlertDialogContent className="sm:max-w-100 rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-gray-800 text-base">
              <AlertTriangle className="h-5 w-5 text-red-500 shrink-0" />
              Xác nhận đăng xuất
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs text-gray-500 pt-1">
              Bạn có chắc chắn muốn đăng xuất khỏi hệ thống không?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="pt-2">
            <AlertDialogCancel disabled={isLoggingOut} className="rounded-xl text-xs font-semibold">
              Hủy
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmLogout}
              disabled={isLoggingOut}
              className="bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold"
            >
              {isLoggingOut ? 'Đang đăng xuất...' : 'Đăng xuất'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Header;