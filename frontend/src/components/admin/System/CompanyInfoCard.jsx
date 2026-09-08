import React, { useState } from "react";
import { Building2, Camera } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function CompanyInfoCard({ formData, onChange }) {
  const [logoPreview, setLogoPreview] = useState(formData?.logoUrl || null);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setLogoPreview(previewUrl);
      
      onChange({
        target: {
          name: 'logoUrl',
          value: previewUrl 
        }
      });
    }
  };

  return (
    <div className="bg-indigo-50/40 dark:bg-gray-950 border border-indigo-100/80 dark:border-gray-800 rounded-2xl p-6 shadow-sm space-y-6">
      <div className="flex items-center gap-2.5 border-b border-indigo-100/60 dark:border-gray-800 pb-3">
        <Building2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        <h3 className="font-bold text-slate-800 dark:text-white text-sm">Thông tin công ty</h3>
      </div>

      <div className="flex items-center gap-5">
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 flex items-center justify-center overflow-hidden shadow-sm">
            {logoPreview ? (
              <img src={logoPreview} alt="Company Logo" className="w-full h-full object-cover" />
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
          <h4 className="font-bold text-slate-800 dark:text-white text-xs">Logo Công ty</h4>
          <p className="text-[11px] text-slate-400 dark:text-gray-400 mt-0.5">
            Tải lên logo chính thức của doanh nghiệp (định dạng PNG, JPG, tối đa 2MB).
          </p>
          <label className="inline-block text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer mt-1">
            Thay đổi ảnh đại diện
            <input type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-gray-300 mb-1">
            Tên pháp lý công ty
          </label>
          <Input
            name="companyName"
            value={formData?.companyName || ''}
            onChange={onChange}
            className="bg-white dark:bg-gray-900 border-slate-200 dark:border-gray-700 rounded-xl text-xs h-10 shadow-none text-slate-800 dark:text-white font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-gray-300 mb-1">
            Mã số đăng ký kinh doanh
          </label>
          <Input
            name="taxCode"
            value={formData?.taxCode || ''}
            onChange={onChange}
            className="bg-white dark:bg-gray-900 border-slate-200 dark:border-gray-700 rounded-xl text-xs h-10 shadow-none text-slate-800 dark:text-white font-medium"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-slate-700 dark:text-gray-300 mb-1">
            Địa chỉ trụ sở chính
          </label>
          <Input
            name="address"
            value={formData?.address || ''}
            onChange={onChange}
            className="bg-white dark:bg-gray-900 border-slate-200 dark:border-gray-700 rounded-xl text-xs h-10 shadow-none text-slate-800 dark:text-white font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-gray-300 mb-1">
            Email liên hệ
          </label>
          <Input
            name="email"
            value={formData?.email || ''}
            onChange={onChange}
            className="bg-white dark:bg-gray-900 border-slate-200 dark:border-gray-700 rounded-xl text-xs h-10 shadow-none text-slate-800 dark:text-white font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-gray-300 mb-1">
            Số điện thoại
          </label>
          <Input
            name="phone"
            value={formData?.phone || ''}
            onChange={onChange}
            className="bg-white dark:bg-gray-900 border-slate-200 dark:border-gray-700 rounded-xl text-xs h-10 shadow-none text-slate-800 dark:text-white font-medium"
          />
        </div>
      </div>
    </div>
  );
}