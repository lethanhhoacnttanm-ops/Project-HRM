import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProcessTable from "./tables/ProcessTable.jsx";
import EligibilityTable from "./tables/EligibilityTable.jsx";
import HistoryTable from "./tables/HistoryTable.jsx";

export default function PromotionTable({ activeTab }) {
  return (
    <div className="bg-white border border-slate-200 rounded-b-xl border-t-0 p-4 dark:bg-gray-900 dark:border-gray-800">
      {activeTab === "process" && <ProcessTable />}
      {activeTab === "eligibility" && <EligibilityTable />}
      {activeTab === "history" && <HistoryTable />}

      <div className="flex items-center justify-between px-2 pt-4 border-t border-slate-200 dark:border-gray-800 text-xs text-slate-500 dark:text-gray-400 mt-4">
        <p>Hiển thị 1–4 trong số 12 phòng ban</p>

        <div className="flex items-center gap-1">
          <button className="p-1.5 rounded-lg border border-slate-200 dark:border-gray-700 text-slate-400 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button className="w-7 h-7 rounded-lg bg-indigo-600 dark:bg-indigo-600 text-white font-semibold flex items-center justify-center cursor-pointer border-0">
            1
          </button>

          <button className="w-7 h-7 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-800 text-slate-600 dark:text-gray-300 font-medium flex items-center justify-center cursor-pointer">
            2
          </button>
          <button className="w-7 h-7 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-800 text-slate-600 dark:text-gray-300 font-medium flex items-center justify-center cursor-pointer">
            3
          </button>

          <button className="p-1.5 rounded-lg border border-slate-200 dark:border-gray-700 text-slate-400 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}