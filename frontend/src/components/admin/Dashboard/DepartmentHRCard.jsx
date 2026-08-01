import React from 'react';
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const hrDepartments = [
  { title: 'Nhân sự', subtitle: 'Tổng nhân sự', count: 3 },
  { title: 'Nhân sự', subtitle: 'Tổng nhân sự', count: 3 },
  { title: 'Nhân sự', subtitle: 'Tổng nhân sự', count: 3 },
];

const DepartmentHRCard = () => {
  return (
    <TooltipProvider>
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Nhân sự</h2>
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 rounded-lg gap-1"
          >
            Xem tất cả
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="space-y-3">
          {hrDepartments.map((dept, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 border border-gray-100 rounded-xl"
            >
              <div>
                <h3 className="text-sm font-bold text-gray-800">{dept.title}</h3>
                <p className="text-[11px] text-gray-400 font-medium">{dept.subtitle}</p>
              </div>

              <div className="flex items-center -space-x-2 overflow-hidden py-1 pl-1">
                <Avatar className="h-7 w-7 border-2 border-white ring-0">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Felix" />
                  <AvatarFallback className="text-[10px]">F</AvatarFallback>
                </Avatar>

                <Avatar className="h-7 w-7 border-2 border-white ring-0">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka" alt="Aneka" />
                  <AvatarFallback className="text-[10px]">A</AvatarFallback>
                </Avatar>

                <Avatar className="h-7 w-7 border-2 border-white ring-0">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mark" alt="Mark" />
                  <AvatarFallback className="text-[10px]">M</AvatarFallback>
                </Avatar>

                <Tooltip>
                  <TooltipTrigger>
                    <Avatar className="h-7 w-7 border-2 border-white bg-indigo-400 text-white cursor-pointer hover:bg-indigo-500 transition-colors">
                      <AvatarFallback className="bg-indigo-400 text-white text-[10px] font-bold">
                        +{dept.count}
                      </AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="text-xs">
                    <p>Nhiều hơn</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default DepartmentHRCard;