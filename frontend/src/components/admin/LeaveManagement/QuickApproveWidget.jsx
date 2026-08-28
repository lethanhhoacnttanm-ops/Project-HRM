import React from "react";
import { Button } from "@/components/ui/button";

export default function QuickApproveWidget({dataLeave, onSubmit}) {

  const pendingLeaves = dataLeave.filter((leave) => leave.status === 'Chờ duyệt');

  const handleApproved = (leaveId) => {
    const payload = {
      id: leaveId,
      status: 'Đã duyệt',
    };
    if (onSubmit) {
      onSubmit(payload); 
    }
  };

  const handleRejected = (leaveId) => {
    const payload = {
      id: leaveId,
      status: 'Từ chối',
    };
    if (onSubmit) {
      onSubmit(payload); 
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-800 text-sm">Phê duyệt nhanh</h3>
        <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full font-semibold">
          {pendingLeaves.length} đơn chờ
        </span>
      </div>

      {pendingLeaves.length === 0 ? (
        <p className="text-xs text-slate-400 text-center py-4 italic">
          Không có đơn nào đang chờ duyệt.
        </p>
      ) : (
        <div className="space-y-3 max-h-88 overflow-y-auto pr-1">
          {pendingLeaves.map((leave) => (
            <div 
              key={leave._id} 
              className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4 space-y-3 transition-all hover:shadow-sm"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-800 text-sm">
                  {leave.employee?.fullName || 'Nhân viên'}
                </h4>
                <span className="text-xs font-semibold text-slate-500">
                  {leave.numberOfDays} ngày
                </span>
              </div>
              
              <p className="text-xs text-slate-500 italic">
                "{leave.reason || 'Không có lý do'}"
              </p>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <Button 
                  onClick={() => handleApproved(leave._id)}
                  className="bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold h-8 rounded-lg shadow-sm"
                >
                  Duyệt
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleRejected(leave._id)}
                  className="border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold h-8 rounded-lg"
                >
                  Từ chối
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}