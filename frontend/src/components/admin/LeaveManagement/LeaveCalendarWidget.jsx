import React from "react";

export default function LeaveCalendarWidget() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-800 text-sm">Lịch nghỉ phép</h3>
        <span className="text-xs font-semibold text-slate-400">Tháng 5, 2024</span>
      </div>

      <div className="text-center text-xs">
        <div className="grid grid-cols-7 gap-1 font-bold text-slate-400 mb-2 text-[10px]">
          <span>CN</span><span>T2</span><span>T3</span><span>T4</span><span>T5</span><span>T6</span><span>T7</span>
        </div>
        <div className="grid grid-cols-7 gap-1 text-slate-600 text-[11px] font-medium">
          <span className="text-slate-300">28</span>
          <span className="text-slate-300">29</span>
          <span className="text-slate-300">30</span>
          <span>1</span><span>2</span><span>3</span><span>4</span>
          <span>5</span><span>6</span><span>7</span>
          <span className="relative">8<span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-amber-500 rounded-full"></span></span>
          <span className="relative">9<span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-amber-500 rounded-full"></span></span>
          <span>10</span><span>11</span>
          <span className="relative">12<span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-teal-500 rounded-full"></span></span>
          <span>13</span><span>14</span>
          <span className="bg-indigo-600 text-white font-bold rounded-lg py-0.5">15</span>
          <span>16</span><span>17</span><span>18</span>
          <span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span>
        </div>
      </div>

      <div className="space-y-1.5 pt-2 border-t border-slate-100 text-[11px]">
        <div className="flex items-center gap-2 text-slate-600">
          <span className="w-2 h-2 rounded-full bg-teal-500"></span>
          <span>Số lượng nghỉ thấp</span>
        </div>
        <div className="flex items-center gap-2 text-slate-600">
          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
          <span>Số lượng nghỉ cao (Peak)</span>
        </div>
      </div>
    </div>
  );
}