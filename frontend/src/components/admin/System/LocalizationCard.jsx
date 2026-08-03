import React from "react";
import { Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function LocalizationCard() {
  return (
    <div className="bg-indigo-50/40 border border-indigo-100/80 rounded-2xl p-6 shadow-sm space-y-6">
      <div className="flex items-center gap-2.5 border-b border-indigo-100/60 pb-3">
        <Globe className="w-5 h-5 text-indigo-600" />
        <h3 className="font-bold text-slate-800 text-sm">Bản địa hóa</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Ngôn ngữ chính
          </label>
          <Select defaultValue="vi">
            <SelectTrigger className="w-full bg-white border-slate-200 rounded-xl text-xs h-10 font-medium text-slate-800">
              <SelectValue placeholder="Chọn ngôn ngữ" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="vi" className="text-xs font-medium">Tiếng Việt (Vietnam)</SelectItem>
              <SelectItem value="en" className="text-xs font-medium">English (US)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Múi giờ
          </label>
          <Select defaultValue="gmt7">
            <SelectTrigger className="w-full bg-white border-slate-200 rounded-xl text-xs h-10 font-medium text-slate-800">
              <SelectValue placeholder="Chọn múi giờ" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="gmt7" className="text-xs font-medium">(GMT+07:00) Bangkok, Hanoi, Jakarta</SelectItem>
              <SelectItem value="gmt8" className="text-xs font-medium">(GMT+08:00) Singapore, Beijing</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Định dạng ngày tháng
          </label>
          <Select defaultValue="ddmmyyyy">
            <SelectTrigger className="w-full bg-white border-slate-200 rounded-xl text-xs h-10 font-medium text-slate-800">
              <SelectValue placeholder="Chọn định dạng ngày" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="ddmmyyyy" className="text-xs font-medium">DD/MM/YYYY (31/12/2023)</SelectItem>
              <SelectItem value="mmddyyyy" className="text-xs font-medium">MM/DD/YYYY (12/31/2023)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Định dạng thời gian
          </label>
          <Select defaultValue="24h">
            <SelectTrigger className="w-full bg-white border-slate-200 rounded-xl text-xs h-10 font-medium text-slate-800">
              <SelectValue placeholder="Chọn định dạng giờ" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="24h" className="text-xs font-medium">24 giờ (14:30)</SelectItem>
              <SelectItem value="12h" className="text-xs font-medium">12 giờ (02:30 PM)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}