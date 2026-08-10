import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import jsPDF from 'jspdf';
import dayjs from 'dayjs'; 
import autoTable from 'jspdf-autotable';

const removeVietnameseTones = (str) => {
  if (!str) return '';
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  return str;
}

const ContractExport = ({ contracts }) => {
  const handleExportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('BAO CAO THONG KE HOP DONG LAO DONG', 14, 15);
    doc.setFontSize(10);
    doc.text(`Ngay xuat bao cao: ${dayjs().format('DD/MM/YYYY')}`, 14, 22);

    const tableColumn = ['ID', 'Ho va Ten', 'Loai HD', 'Ngay bat dau', 'Ngay ket thuc', 'Trang thai'];
    
    const tableRows = contracts.map((item) => [
      item?.contractCode || 'N/A',
      removeVietnameseTones(item?.employee?.fullName || 'N/A'), 
      removeVietnameseTones(item?.type ||  'N/A'),
      item.startDate ? dayjs(item.startDate).format('DD/MM/YYYY') : 'N/A',
      item.endDate ? dayjs(item.endDate).format('DD/MM/YYYY') : 'N/A',
      item.status === 'active' ? 'Hoat dong' : 'Dang nghi',
    ]);

    autoTable(doc, {
      startY: 28,
      head: [tableColumn],
      body: tableRows,
      theme: 'grid',
    });

    doc.save(`Thong_Ke_Hop_Dong_${Date.now()}.pdf`);
  };

  return (
    <Button
      onClick={handleExportPDF}
      variant="outline" 
      className="flex items-center gap-2 rounded-xl text-gray-700 font-semibold h-10 px-4"
    >
      <Download className="w-4 h-4" /> 
      Export
    </Button>
  );
};

export default ContractExport;