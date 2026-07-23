import React from 'react';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ContractExport = ({ contracts = [] }) => {
  const handleExportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('BAO CAO THONG KE HOP DONG LAO DONG', 14, 15);
    doc.setFontSize(10);
    doc.text(`Ngay xuat bao cao: ${new Date().toLocaleDateString('vi-VN')}`, 14, 22);

    const tableColumn = ['ID', 'Ho va Ten', 'Loai HD', 'Ngay bat dau', 'Ngay ket thuc', 'Trang thai'];
    const tableRows = contracts.map((item) => [
      item.code,
      item.name,
      item.type,
      item.startDate,
      item.endDate,
      item.status === 'active' ? 'Hoat dong' : 'Dang nghi',
    ]);

    doc.autoTable({
      startY: 28,
      head: [tableColumn],
      body: tableRows,
      theme: 'grid',
    });

    doc.save(`Thong_Ke_Hop_Dong_${Date.now()}.pdf`);
  };

  return (
    <Button
      icon={<DownloadOutlined />}
      onClick={handleExportPDF}
      className="rounded-xl border-gray-300 text-gray-700 font-semibold h-10 px-4 cursor-pointer hover:bg-gray-50"
    >
      Export
    </Button>
  );
};

export default ContractExport;