import React from "react";
import { Button } from "../../ui/button.jsx";

const tags = [
  { id: "all", label: "Tất cả" },
  { id: "soft_skills", label: "Kỹ năng mềm" },
  { id: "tech", label: "Kỹ thuật" },
  { id: "compliance", label: "Sự tuân thủ" },
];

export default function TrainingFilter({ activeFilter, setActiveFilter }) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 px-6 bg-white border-b border-slate-100">
      <div className="flex flex-wrap items-center gap-2">
        {tags.map((tag) => (
          <Button
            key={tag.id}
            onClick={() => setActiveFilter(tag.id)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeFilter === tag.id
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {tag.label}
          </Button>
        ))}
      </div>
      <span className="text-xs font-medium text-slate-400">
        Hiển thị 1-8 trong số 24 khóa học
      </span>
    </div>
  );
}