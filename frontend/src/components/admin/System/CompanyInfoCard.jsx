import React, { useState } from "react";
import { Building2, Camera } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function CompanyInfoCard() {
  const [logoUrl, setLogoUrl] = useState(null);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="bg-indigo-50/40 border border-indigo-100/80 rounded-2xl p-6 shadow-sm space-y-6">
      <div className="flex items-center gap-2.5 border-b border-indigo-100/60 pb-3">
        <Building2 className="w-5 h-5 text-indigo-600" />
        <h3 className="font-bold text-slate-800 text-sm">Thông tin công ty</h3>
      </div>

      <div className="flex items-center gap-5">
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-white border border-slate-200 flex items-center justify-center overflow-hidden shadow-sm">
            {logoUrl ? (
              <img src={logoUrl} alt="Company Logo" className="w-full h-full object-cover" />
            ) : (
              <div className="w-12 h-12 rounded-full bg-teal-500 flex items-center justify-center text-white font-black text-xl">
                G
              </div>
            )}
          </div>
          <label className="absolute -bottom-1 -right-1 bg-indigo-600 text-white p-1.5 rounded-full cursor-pointer hover:bg-indigo-700 shadow-md transition-colors">
            <Camera className="w-3.5 h-3.5" />
            <input type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
          </label>
        </div>

        <div>
          <h4 className="font-bold text-slate-800 text-xs">Logo Công ty</h4>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Tải lên logo chính thức của doanh nghiệp (định dạng PNG, JPG, tối đa 2MB).
          </p>
          <label className="inline-block text-xs font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer mt-1">
            Thay đổi ảnh đại diện
            <input type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Tên pháp lý công ty
          </label>
          <Input
            defaultValue="Công ty Cổ phần Giải pháp Công nghệ Việt"
            className="bg-white border-slate-200 rounded-xl text-xs h-10 shadow-none text-slate-800 font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Mã số đăng ký kinh doanh
          </label>
          <Input
            defaultValue="0123456789"
            className="bg-white border-slate-200 rounded-xl text-xs h-10 shadow-none text-slate-800 font-medium"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Địa chỉ trụ sở chính
          </label>
          <Input
            defaultValue="Tầng 12, Tòa nhà Innovation, Khu Công nghệ cao, Quận 9, TP. HCM"
            className="bg-white border-slate-200 rounded-xl text-xs h-10 shadow-none text-slate-800 font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Email liên hệ
          </label>
          <Input
            defaultValue="contact@vn-techsolutions.vn"
            className="bg-white border-slate-200 rounded-xl text-xs h-10 shadow-none text-slate-800 font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Số điện thoại
          </label>
          <Input
            defaultValue="+84 28 1234 5678"
            className="bg-white border-slate-200 rounded-xl text-xs h-10 shadow-none text-slate-800 font-medium"
          />
        </div>
      </div>
    </div>
  );
}