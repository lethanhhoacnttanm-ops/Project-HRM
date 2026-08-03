import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, User, Mail, Phone } from "lucide-react";

const EmployeeDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="space-y-6 p-2">
      <Button
        variant="outline"
        onClick={() => navigate('/admin-page/employees')}
        className="rounded-xl border-gray-200 text-gray-600 font-semibold cursor-pointer gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Quay lại danh sách
      </Button>

      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
          <div className="w-20 h-20 rounded-full bg-blue-50 border-2 border-blue-200 flex items-center justify-center text-blue-600 font-bold shrink-0">
            <User className="h-10 w-10" />
          </div>
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-3 flex-wrap">
              <h1 className="text-2xl font-extrabold text-gray-900">Lương Diệu Kiệt</h1>
              <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100 rounded-md font-semibold border-0 px-2.5 py-0.5">
                Đang hoạt động
              </Badge>
            </div>
            <p className="text-sm text-gray-500 mt-1 font-medium">
              Backend Developer • Mã NV: NV-{id || '001'}
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-4 text-xs text-gray-400 mt-2 flex-wrap">
              <span className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5" /> dieukietbigtech@gmail.com
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5" /> 0901 234 567
              </span>
            </div>
          </div>
        </div>

        <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-10 px-5 font-semibold shrink-0 cursor-pointer">
          Chỉnh sửa hồ sơ
        </Button>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
        <Tabs defaultValue="1" className="w-full">
          <TabsList className="grid w-full grid-cols-3 sm:w-120 rounded-xl bg-slate-100 p-1">
            <TabsTrigger value="1" className="rounded-lg text-xs font-bold">
              Thông tin cá nhân
            </TabsTrigger>
            <TabsTrigger value="2" className="rounded-lg text-xs font-bold">
              Hợp đồng & Lương
            </TabsTrigger>
            <TabsTrigger value="3" className="rounded-lg text-xs font-bold">
              Lịch sử chấm công
            </TabsTrigger>
          </TabsList>

          <TabsContent value="1" className="pt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 text-sm">
              <div className="space-y-3">
                <h4 className="font-bold text-gray-800 border-b border-gray-100 pb-2">
                  Thông tin cơ bản
                </h4>
                <p><span className="text-gray-400 w-32 inline-block">Ngày sinh:</span> 26/01/2004</p>
                <p><span className="text-gray-400 w-32 inline-block">Giới tính:</span> Nam</p>
                <p><span className="text-gray-400 w-32 inline-block">CCCD/CMND:</span> 079204001234</p>
              </div>
              <div className="space-y-3">
                <h4 className="font-bold text-gray-800 border-b border-gray-100 pb-2">
                  Công tác
                </h4>
                <p><span className="text-gray-400 w-32 inline-block">Phòng ban:</span> SmartTeach</p>
                <p><span className="text-gray-400 w-32 inline-block">Ngày vào làm:</span> 01/10/2025</p>
                <p><span className="text-gray-400 w-32 inline-block">Loại hợp đồng:</span> Chính thức</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="2">
            <div className="py-6 text-gray-400 text-sm">
              Thông tin Hợp đồng & Lương thưởng...
            </div>
          </TabsContent>

          <TabsContent value="3">
            <div className="py-6 text-gray-400 text-sm">
              Bảng ghi chép Chấm công chi tiết...
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EmployeeDetailsPage;