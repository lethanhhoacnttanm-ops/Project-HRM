import React, { useState, useEffect } from 'react';
import { 
  Users, Wallet, Ticket, UserCheck, 
  RefreshCw 
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, 
  Tooltip, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, Legend 
} from 'recharts';

import candidateService from '@/services/candidate.service';
import {employeeService} from '@/services/employee.service';
import {payrollService} from '@/services/payroll.service';
import {leaveService} from '@/services/leave.service';
import {supportService} from '@/services/support.service';
import {performanceService} from '@/services/performance.service';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalEmployees: 1248, 
    totalPayroll: 0,
    pendingTickets: 0,
    activeCandidates: 0,
  });

  const [miniTrendData] = useState({
    employees: [
      { day: 'T2', value: 1230 }, { day: 'T3', value: 1235 }, 
      { day: 'T4', value: 1240 }, { day: 'T5', value: 1242 }, { day: 'T6', value: 1248 }
    ],
    payroll: [
      { month: 'Th 4', value: 2.1 }, { month: 'Th 5', value: 2.3 }, 
      { month: 'Th 6', value: 2.2 }, { month: 'Th 7', value: 2.5 }
    ],
    candidates: [
      { week: 'Tuần 1', value: 10 }, { week: 'Tuần 2', value: 15 }, 
      { week: 'Tuần 3', value: 8 }, { week: 'Tuần hiện tại', value: 14 }
    ],
    tickets: [
      { day: 'T2', value: 5 }, { day: 'T3', value: 2 }, 
      { day: 'T4', value: 8 }, { day: 'T5', value: 1 }, { day: 'T6', value: 0 }
    ]
  });

  const [candidateChartData, setCandidateChartData] = useState([]);
  const [payrollChartData, setPayrollChartData] = useState([]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [employeeRes, candidatesRes, payrollRes, ticketsRes, leaveRes] = await Promise.all([
        employeeService.getAllDataEmpForBenefit("EMPLOYEE").catch(() => ({ dataEmployees: [] })),
        candidateService.getCandidatesNoPaging().catch(() => ({ dataCandidates: [] })),
        payrollService.getPayrollsNoPaging().catch(() => ({ dataPayrolls: [] })),
        supportService.getTicketsNoPaging().catch(() => ({ dataTickets: [] })),
        leaveService.getLeavesNoPaging().catch(() => ({ dataLeaves: [] })),
      ]);

      const employees = employeeRes?.dataEmp || [];
      const candidates = candidatesRes?.dataCandidates || [];
      const payrolls = payrollRes?.dataPayrolls || [];
      const tickets = ticketsRes?.dataTickets || [];

      const totalNetSalary = payrolls.reduce((acc, curr) => acc + (curr.netSalary || 0), 0);

      const urgentTickets = tickets.filter(t => t.status === 'Mở').length;

      const activeCands = candidates.filter(c => c.stage !== 'rejected' && c.stage !== 'offered').length;

      setStats({
        totalEmployees: employees.length,
        totalPayroll: totalNetSalary,
        pendingTickets: urgentTickets,
        activeCandidates: activeCands,
      });

      const stageCounts = {
        'Hồ sơ mới': candidates.filter(c => c.stage === 'new').length,
        'Phỏng vấn': candidates.filter(c => c.stage === 'interview').length,
        'Đánh giá': candidates.filter(c => c.stage === 'evaluating').length,
        'Trúng tuyển': candidates.filter(c => c.stage === 'offered').length,
        'Từ chối': candidates.filter(c => c.stage === 'rejected').length,
      };

      setCandidateChartData([
        { name: 'Hồ sơ mới', value: stageCounts['Hồ sơ mới'], color: '#8b5cf6' },
        { name: 'Phỏng vấn', value: stageCounts['Phỏng vấn'], color: '#3b82f6' },
        { name: 'Đánh giá', value: stageCounts['Đánh giá'], color: '#eab308' },
        { name: 'Trúng tuyển', value: stageCounts['Trúng tuyển'], color: '#10b981' },
        { name: 'Từ chối', value: stageCounts['Từ chối'], color: '#f43f5e' },
      ]);

      setPayrollChartData([
        { month: 'Tháng 4', salary: 2.1 },
        { month: 'Tháng 5', salary: 2.3 },
        { month: 'Tháng 6', salary: 2.2 },
        { month: 'Tháng 7', salary: 2.4 },
        { month: 'Tháng hiện tại', salary: totalNetSalary ? Number((totalNetSalary / 1e9).toFixed(2)) : 2.5 },
      ]);

    } catch (error) {
      console.error("Lỗi tải dữ liệu Dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const formatCurrency = (amount) => {
    if (!amount) return "0 VNĐ";
    if (amount >= 1e9) return `${(amount / 1e9).toFixed(1)} tỷ VNĐ`;
    return `${(amount / 1e6).toFixed(1)} tr VNĐ`;
  };

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Tổng quan hệ thống nhân sự</h1>
          <p className="text-xs text-slate-500 mt-1">Cập nhật dữ liệu thời gian thực cho tháng này </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
           Tháng hiện tại
          </span>
          <button 
            onClick={fetchDashboardData}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 text-slate-600 dark:text-slate-400 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md">
                +2.4% tuần này
              </span>
            </div>
            <div className="mt-3">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Tổng nhân sự</p>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">{stats.totalEmployees}</h3>
            </div>
          </div>
          <div className="h-14 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={miniTrendData.employees}>
                <defs>
                  <linearGradient id="colorEmp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorEmp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                <Wallet className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md">
                Ổn định
              </span>
            </div>
            <div className="mt-3">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Tổng quỹ lương tháng</p>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">{formatCurrency(stats.totalPayroll)}</h3>
            </div>
          </div>
          <div className="h-14 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={miniTrendData.payroll}>
                <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                <UserCheck className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded-md">
                Tuyển dụng
              </span>
            </div>
            <div className="mt-3">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Ứng viên đang xử lý</p>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">{stats.activeCandidates}</h3>
            </div>
          </div>
          <div className="h-14 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={miniTrendData.candidates}>
                <defs>
                  <linearGradient id="colorCand" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorCand)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400">
                <Ticket className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold text-rose-600 bg-rose-50 dark:bg-rose-950/50 px-2 py-0.5 rounded-md">
                Cần xử lý
              </span>
            </div>
            <div className="mt-3">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Yêu cầu hỗ trợ mở</p>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">{stats.pendingTickets}</h3>
            </div>
          </div>
          <div className="h-14 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={miniTrendData.tickets}>
                <Bar dataKey="value" fill="#f43f5e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Biến động quỹ lương (tỷ VNĐ)</h3>
              <p className="text-xs text-slate-400 mt-0.5">So sánh chi phí chi trả qua các tháng gần đây</p>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={payrollChartData}>
                <defs>
                  <linearGradient id="salaryColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.1} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }} />
                <Area type="monotone" dataKey="salary" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#salaryColor)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Phân bổ Pipeline tuyển dụng</h3>
            <p className="text-xs text-slate-400 mt-0.5">Tỷ lệ ứng viên theo các giai đoạn hiện tại</p>
          </div>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={candidateChartData} cx="50%" cy="50%" innerRadius={60} outerRadius={85} paddingAngle={4} dataKey="value">
                  {candidateChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }} />
                <Legend iconSize={8} layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}