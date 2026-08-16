import React from "react";
import { Search, SlidersHorizontal, Plus } from "lucide-react";
import { Button } from "../../ui/button.jsx";
import { Input } from "../../ui/input.jsx";

export default function DepartmentFilter({
  searchTerm,
  setSearchTerm,
  onOpenAddModal,
}) {
 return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="relative w-full sm:w-96">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 z-10" />
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm kiếm theo phòng ban, người đứng đầu hoặc thẻ..."
          className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500"
        />
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
        <Button 
          className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4 text-slate-500 dark:text-slate-400" />
          <span>Bộ lọc</span>
        </Button>

        <Button 
          onClick={() => onOpenAddModal('create')}
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-md transition-all border-none"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm phòng ban</span>
        </Button>
      </div>
    </div>
  );
}