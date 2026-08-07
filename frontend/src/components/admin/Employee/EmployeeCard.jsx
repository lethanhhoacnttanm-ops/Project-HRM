import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EmployeeCard = ({ employees }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const list = employees.length > 0 ? employees : defaultEmployees;
  const itemsPerPage = 3; 
  const totalPages = Math.ceil(list.length / itemsPerPage);

  const handleNext = () => {
    if (currentIndex < totalPages - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const visibleEmployees = list.slice(
    currentIndex * itemsPerPage,
    currentIndex * itemsPerPage + itemsPerPage
  );

  return (
    <div className="relative px-8 py-2">
      <Button
        onClick={handlePrev}
        disabled={currentIndex === 0}
        className={`absolute -left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-md transition-all z-10 cursor-pointer ${
          currentIndex === 0
            ? 'opacity-30 cursor-not-allowed bg-gray-100 border-gray-200 text-gray-400'
            : 'hover:bg-indigo-600 hover:text-white hover:scale-105'
        }`}
      >
        <ChevronLeft className="text-base font-bold" />
      </Button>

      <Button
        onClick={handleNext}
        disabled={currentIndex >= totalPages - 1}
        className={`absolute -right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-md transition-all z-10 cursor-pointer ${
          currentIndex >= totalPages - 1
            ? 'opacity-30 cursor-not-allowed bg-gray-100 border-gray-200 text-gray-400'
            : 'hover:bg-indigo-600 hover:text-white hover:scale-105'
        }`}
      >
        <ChevronRight className="text-base font-bold" />
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-500 ease-in-out">
        {visibleEmployees.map((emp, index) => (
          <div
            key={emp.id || index}
            onClick={() => navigate(`/admin-page/employees/${emp.id || index}`)}
            className="bg-white rounded-3xl border-2 border-indigo-400 p-5 shadow-2xl shadow-indigo-100 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-indigo-200 cursor-pointer flex flex-col justify-between h-full"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-28 h-28 rounded-2xl overflow-hidden border-2 border-indigo-500 shadow-xs shrink-0">
                <User className='w-full h-full text-gray-300'/>
              </div>

              <div className="flex flex-col items-center justify-center pt-2 pr-2">
                <div className="w-20 h-20 rounded-xl bg-white flex items-center justify-center text-white mb-1 shadow-xs">
                  <img src="/hrm_system_logo.png" alt="logo" />
                </div>
                <span className="text-sm font-extrabold text-gray-600 tracking-tight">
                  HRM System
                </span>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <h3 className="text-xl font-black text-blue-700 tracking-tight truncate">
                {emp.fullname}
              </h3>

              <div className="inline-block bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-2xs">
                { emp.role === "EMPLOYEE" ? "Nhân viên" : "?"}
              </div>
            </div>

            <div className="space-y-1.5 text-xs font-semibold text-gray-500 border-t border-gray-100 pt-3">
              <div className="flex items-center">
                <span className="w-14 font-extrabold text-blue-700">ID</span>
                <span className="mr-2 text-blue-700 font-extrabold">:</span>
                <span>{emp.code}</span>
              </div>

              <div className="flex items-center">
                <span className="w-14 font-extrabold text-blue-700">Email</span>
                <span className="mr-2 text-blue-700 font-extrabold">:</span>
                <span className="truncate">{emp.email || 'hargobigtech@gmail.com'}</span>
              </div>

              <div className="flex items-center">
                <span className="w-14 font-extrabold text-blue-700">Phone</span>
                <span className="mr-2 text-blue-700 font-extrabold">:</span>
                <span>{emp.phone}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <Button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                currentIndex === idx ? 'w-7 bg-indigo-600' : 'w-2.5 bg-indigo-200 hover:bg-indigo-300'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeCard;