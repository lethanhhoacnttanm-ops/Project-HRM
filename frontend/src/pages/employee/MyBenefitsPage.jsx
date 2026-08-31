import React, { useEffect, useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Gift, Calendar, DollarSign, ShieldCheck } from 'lucide-react';
import { benefitService } from '@/services/benefit.service';
import { toast } from 'sonner';

export default function MyBenefitsPage () {
  const [myBenefits, setMyBenefits] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMyBenefits = async () => {
    try {
      setLoading(true);
      const res = await benefitService.getMyBenefitsNew();
      if (res && res.success) {
        setMyBenefits(res.data);
      }
    } catch (error) {
      toast.error('Không thể tải danh sách phúc lợi của bạn!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBenefits();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Phúc lợi của tôi</h1>
        <p className="text-sm text-slate-500">
          Danh sách các chính sách đãi ngộ và hỗ trợ mà công ty đã áp dụng cho bạn.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-400">Đang tải thông tin phúc lợi...</div>
      ) : myBenefits.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
          <Gift className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-slate-700">Chưa có phúc lợi nào được phân bổ</h3>
          <p className="text-xs text-slate-400 mt-1">Bạn sẽ nhìn thấy chính sách tại đây khi được Admin thêm vào.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myBenefits.map((item) => (
            <Card key={item._id} className="rounded-2xl border-slate-200 shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col justify-between">
              <CardHeader className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    item.type === 'Bảo hiểm' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                    item.type === 'Phụ cấp' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-cyan-50 text-cyan-700 border-cyan-200'
                  }`}>
                    {item.type}
                  </Badge>
                  <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded-lg">
                    {item.status}
                  </span>
                </div>
                <CardTitle className="text-lg font-bold text-slate-900 leading-snug">
                  {item.title}
                </CardTitle>
                <CardDescription className="text-xs text-slate-500 line-clamp-2">
                  {item.description || 'Không có mô tả chi tiết cho chính sách này.'}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-xs py-2 border-y border-slate-100">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-emerald-600" /> Mức hỗ trợ:
                  </span>
                  <span className="font-bold text-emerald-600 text-sm">
                    {Number(item.amount || 0).toLocaleString('vi-VN')} VNĐ
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-indigo-600" /> Tần suất chi trả:
                  </span>
                  <span className="font-semibold text-slate-700">{item.frequency}</span>
                </div>
              </CardContent>

              <CardFooter className="pt-2 pb-4 border-t border-slate-50 bg-slate-50/50 rounded-b-2xl flex items-center justify-between text-xs text-slate-500">
                <span>Tổng số nhân sự thụ hưởng:</span>
                <span className="font-bold text-indigo-600">{item.participantsCount} người</span>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

