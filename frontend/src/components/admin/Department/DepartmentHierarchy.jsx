import React from "react";

export default function DepartmentHierarchy() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm text-center">
       <div className="max-w-md mx-auto mb-10">
        <h2 className="text-2xl font-bold text-slate-800">Cơ cấu tổ chức</h2>
        <p className="text-xs text-slate-500 mt-1">
          Hình ảnh trực quan tương tác về cấu trúc các phòng ban trong công ty.
        </p>
      </div>

      <div className="flex flex-col items-center max-w-4xl mx-auto">
        <div className="bg-slate-800 text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-md min-w-60">
          Văn phòng Giám đốc điều hành
        </div>

        <div className="w-0.5 h-8 bg-slate-300"></div>

        <div className="w-[80%] h-0.5 bg-slate-300 relative">
          <div className="absolute left-0 top-0 w-0.5 h-6 bg-slate-300"></div>
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-0.5 h-6 bg-slate-300"></div>
          <div className="absolute right-0 top-0 w-0.5 h-6 bg-slate-300"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full pt-6">
          <div className="border border-slate-200 rounded-xl p-5 bg-white shadow-sm hover:border-indigo-300 transition-colors">
            <h4 className="font-bold text-slate-800 text-sm">Tài chính</h4>
            <p className="text-xs text-slate-500 mt-1">Số lượng người: 18</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-full border-2 border-indigo-600 rounded-xl p-5 bg-white shadow-md">
              <h4 className="font-bold text-slate-800 text-sm">Kỹ thuật</h4>
              <p className="text-xs text-slate-500 mt-1">Tổng số 245 người</p>
            </div>

            <div className="w-0.5 h-6 bg-slate-300"></div>

            <div className="flex items-center gap-3">
              <div className="bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-lg text-[11px] font-medium text-slate-700">
                Giao diện người dùng
              </div>
              <div className="bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-lg text-[11px] font-medium text-slate-700">
                Phần phụ trợ
              </div>
            </div>
          </div>

          <div className="border border-slate-200 rounded-xl p-5 bg-white shadow-sm hover:border-indigo-300 transition-colors">
            <h4 className="font-bold text-slate-800 text-sm">Hoạt động</h4>
            <p className="text-xs text-slate-500 mt-1">Số lượng người: 120</p>
          </div>
        </div>
      </div>
    </div>
  );
}