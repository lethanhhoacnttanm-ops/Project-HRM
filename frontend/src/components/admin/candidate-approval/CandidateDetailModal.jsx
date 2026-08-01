import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, XCircle, User, Mail, Phone } from "lucide-react";

const CandidateDetailModal = ({ isOpen, onClose, candidate }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-170 rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-gray-800">
            Hồ sơ ứng viên
          </DialogTitle>
          <DialogDescription className="sr-only">
            Chi tiết đánh giá và thông tin CV của ứng viên
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-indigo-100 text-indigo-600 font-bold flex items-center justify-center text-xl shrink-0">
                <User className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-gray-800 text-base">
                  {candidate?.name}
                </h3>
                <p className="text-xs text-indigo-600 font-semibold">
                  {candidate?.jobTitle}
                </p>
                <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                  <span className="flex items-center gap-1">
                    <Mail className="h-3.5 w-3.5" /> {candidate?.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="h-3.5 w-3.5" /> {candidate?.phone}
                  </span>
                </div>
              </div>
            </div>
            <Badge
              variant="secondary"
              className="bg-purple-100 text-purple-700 hover:bg-purple-100 rounded-lg font-bold border-0 px-3 py-1"
            >
              {candidate?.stageName || 'Hồ sơ mới'}
            </Badge>
          </div>

          <Tabs defaultValue="eval" className="w-full">
            <TabsList className="grid w-full grid-cols-2 rounded-xl bg-slate-100 p-1">
              <TabsTrigger value="eval" className="rounded-lg text-xs font-bold">
                Đánh giá & Ghi chú phỏng vấn
              </TabsTrigger>
              <TabsTrigger value="cv" className="rounded-lg text-xs font-bold">
                Xem File CV
              </TabsTrigger>
            </TabsList>

            <TabsContent value="eval" className="space-y-3 text-xs pt-3">
              <div>
                <label className="font-bold text-gray-700 block mb-1.5">
                  Nhận xét chuyên môn / Thái độ:
                </label>
                <Textarea
                  rows={4}
                  placeholder="Nhập nhận xét phỏng vấn tại đây..."
                  className="rounded-xl text-xs resize-none"
                />
              </div>
            </TabsContent>

            <TabsContent value="cv" className="pt-3">
              <div className="p-8 border-2 border-dashed border-gray-200 rounded-xl text-center text-gray-400 text-xs">
                [ Bản xem trước File CV PDF của ứng viên ]
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <Button
              variant="destructive"
              onClick={onClose}
              className="rounded-xl font-bold gap-1.5 bg-red-600 hover:bg-red-700"
            >
              <XCircle className="h-4 w-4" />
              Từ chối ứng viên
            </Button>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={onClose}
                className="rounded-xl font-bold"
              >
                Đóng
              </Button>
              <Button
                onClick={onClose}
                className="bg-emerald-600 hover:bg-emerald-700 text-white border-none rounded-xl font-bold gap-1.5"
              >
                <CheckCircle2 className="h-4 w-4" />
                Phê duyệt / Chuyển vòng tiếp
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CandidateDetailModal;