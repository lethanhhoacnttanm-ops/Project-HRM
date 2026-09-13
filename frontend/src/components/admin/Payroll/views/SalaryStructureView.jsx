import React from "react";
import { Wallet, Users, TrendingUp, TrendingDown, DollarSign, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SalaryStructureView({ filteredData = [], fullPayrollData = [], selectedMonth = "" }) {
  console.log("--- DEBUG SALARY STRUCTURE ---");
  console.log("1. selectedMonth đang chọn:", selectedMonth);
  console.log("2. data của tháng hiện tại:", filteredData);
  console.log("3. fullPayrollData truyền vào:", fullPayrollData);
  const currentMonthStats = filteredData.reduce(
    (acc, item) => {
      acc.totalEmployees += 1;
      acc.totalBase += Number(item.baseSalary || 0);
      acc.totalAllowance += Number(item.allowance || 0);
      acc.totalBonus += Number(item.bonus || 0);
      acc.totalDeductions += Number(item.deductions || 0);
      acc.totalNet += Number(item.netSalary || 0);
      return acc;
    },
    { totalEmployees: 0, totalBase: 0, totalAllowance: 0, totalBonus: 0, totalDeductions: 0, totalNet: 0 }
  );

 const getYearFromMonthStr = (str) => {
    if (!str) return new Date().getFullYear().toString();
    const parts = str.includes("/") ? str.split("/") : str.split("-");
    const foundYear = parts.find(p => p.length === 4);
    return foundYear || parts[parts.length - 1] || new Date().getFullYear().toString();
  };

  const currentYear = getYearFromMonthStr(selectedMonth);
  console.log("4. Năm được trích xuất (currentYear):", currentYear);

  const yearlyNetSalary = fullPayrollData
    .filter((item) => {
      if (!item.monthYear) return false;
      const itemYear = getYearFromMonthStr(item.monthYear);
      return itemYear === currentYear;
    })
    .reduce((sum, item) => sum + Number(item.netSalary || 0), 0);

  console.log("5. Tổng Net Salary cộng dồn năm:", yearlyNetSalary);

 return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Nhân sự (Tháng)</span>
          <div className="w-9 h-9 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-4">
          <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            {currentMonthStats.totalEmployees} <span className="text-xs font-normal text-slate-500">người</span>
          </h4>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Lương cơ bản</span>
          <div className="w-9 h-9 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center">
            <Wallet className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-4">
          <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            {currentMonthStats.totalBase.toLocaleString('vi-VN')} <span className="text-xs font-normal text-slate-500">đ</span>
          </h4>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Phụ cấp & Phạt</span>
          <div className="w-9 h-9 bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold">
          <span className="text-emerald-600 dark:text-emerald-400">
            +{(currentMonthStats.totalAllowance + currentMonthStats.totalBonus).toLocaleString('vi-VN')}đ
          </span>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <span className="text-rose-600 dark:text-rose-400">
            -{currentMonthStats.totalDeductions.toLocaleString('vi-VN')}đ
          </span>
        </div>
      </div>

      <div className="bg-white border border-indigo-100 dark:border-indigo-950/50  dark:bg-indigo-950/10 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Thực chi tháng</span>
          <div className="w-9 h-9 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center">
            <DollarSign className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-4">
          <h4 className="text-lg font-bold text-indigo-700 dark:text-indigo-300">
            {currentMonthStats.totalNet.toLocaleString('vi-VN')} <span className="text-xs font-normal text-indigo-500">đ</span>
          </h4>
        </div>
      </div>

      <div className="bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 rounded-2xl p-4 shadow-sm flex flex-col justify-between sm:col-span-2 lg:col-span-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Cộng dồn năm {currentYear}</span>
          <div className="w-9 h-9 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center">
            <CalendarDays className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-4">
          <h4 className="text-lg font-bold text-emerald-700 dark:text-emerald-300">
            {yearlyNetSalary.toLocaleString('vi-VN')} <span className="text-xs font-normal text-emerald-500">đ</span>
          </h4>
        </div>
      </div>
    </div>
  );
}