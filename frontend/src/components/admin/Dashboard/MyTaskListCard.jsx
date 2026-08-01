import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock, CheckCircle2, Plus } from "lucide-react";

const myTasks = [
  { time: '8 giờ sáng - 10 giờ sáng', content: 'Hoàn thành công việc tuyển dụng sớm nhất' },
  { time: '10 giờ - 12 giờ', content: 'Hoàn thành công việc tuyển dụng sớm nhất' },
  { time: '10 giờ - 12 giờ', content: 'Hoàn thành công việc tuyển dụng sớm nhất' },
  { time: '10 giờ - 12 giờ', content: 'Hoàn thành công việc tuyển dụng sớm nhất' },
  { time: '10 giờ - 12 giờ', content: 'Hoàn thành công việc tuyển dụng sớm nhất' },
  { time: '10 giờ - 12 giờ', content: 'Hoàn thành công việc tuyển dụng sớm nhất' },
];

const MyTaskListCard = () => {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <h2 className="text-xl font-bold text-gray-800">Công việc của tôi</h2>
        
        <div className="flex flex-wrap items-center gap-2.5">
          <Select defaultValue="Hôm nay">
            <SelectTrigger className="w-28 h-9 text-xs rounded-lg border-gray-200">
              <SelectValue placeholder="Hôm nay" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="Hôm nay" className="text-xs">Hôm nay</SelectItem>
              <SelectItem value="Tuần này" className="text-xs">Tuần này</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-1.5 bg-gray-50/50 p-1 rounded-lg border border-gray-200">
            <Input 
              type="date" 
              className="h-7 w-28 text-[11px] border-0 bg-transparent p-0 focus-visible:ring-0 shadow-none text-gray-600 cursor-pointer"
            />
            <span className="text-gray-400 text-xs">-</span>
            <Input 
              type="date" 
              className="h-7 w-28 text-[11px] border-0 bg-transparent p-0 focus-visible:ring-0 shadow-none text-gray-600 cursor-pointer"
            />
          </div>

          <Button 
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3.5 h-9 rounded-lg gap-1.5 cursor-pointer"
          >
            <Plus className="h-4 w-4" /> Thêm việc
          </Button>
        </div>
      </div>

      <div className="space-y-2.5">
        {myTasks.map((task, idx) => (
          <div 
            key={idx} 
            className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:border-gray-200 transition-colors"
          >
            <div className="flex items-center gap-3 text-xs text-gray-600">
              <Clock className="h-4 w-4 text-gray-400 shrink-0" />
              <span className="font-semibold text-gray-700 w-36 shrink-0">{task.time}</span>
              <span className="text-gray-600 line-clamp-1">{task.content}</span>
            </div>
            <CheckCircle2 className="h-5 w-5 text-gray-400 hover:text-green-500 cursor-pointer transition-colors shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTaskListCard;