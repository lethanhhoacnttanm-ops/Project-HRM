import React from "react";
import { Table, Network } from "lucide-react";
import { Button } from "../../ui/button.jsx";

export default function DepartmentTabView({ viewMode, setViewMode }) {
  return (
    <div className="inline-flex bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-inner">
      <Button
        onClick={() => setViewMode("table")}
        className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
          viewMode === "table"
            ? "bg-white text-indigo-600 shadow-sm"
            : "text-slate-500 hover:text-slate-700"
        }`}
      >
        <Table className="w-4 h-4" />
        <span>Xem dạng bảng</span>
      </Button>

      <Button
        onClick={() => setViewMode("hierarchy")}
        className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
          viewMode === "hierarchy"
            ? "bg-white text-indigo-600 shadow-sm"
            : "text-slate-500 hover:text-slate-700"
        }`}
      >
        <Network className="w-4 h-4" />
        <span>Xem phân cấp</span>
      </Button>
    </div>
  );
}