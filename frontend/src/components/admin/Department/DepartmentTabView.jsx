import React from "react";
import { Table, Network } from "lucide-react";
import { Button } from "../../ui/button.jsx";

export default function DepartmentTabView({ viewMode, setViewMode }) {
  return (
    <div className="inline-flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 shadow-inner">
      <Button
        onClick={() => setViewMode("table")}
        className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
          viewMode === "table"
            ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm"
            : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 bg-transparent"
        }`}
      >
        <Table className="w-4 h-4" />
        <span>Xem dạng bảng</span>
      </Button>

      <Button
        onClick={() => setViewMode("hierarchy")}
        className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
          viewMode === "hierarchy"
            ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm"
            : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 bg-transparent"
        }`}
      >
        <Network className="w-4 h-4" />
        <span>Xem phân cấp</span>
      </Button>
    </div>
  );
}