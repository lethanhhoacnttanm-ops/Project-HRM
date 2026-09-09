import CompanyBudgetModel from "../models/Budget.js";

const getRelativeMonthYear = (monthOffset = 0) => {
  const date = new Date();
  date.setMonth(date.getMonth() + monthOffset);
  
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}-${year}`;
};

export const seedBudgets = async () => {
  try {
    console.log('🌱 Đang kiểm tra và chạy seed dữ liệu ngân sách theo thời gian thực...');

    const prevMonthStr = getRelativeMonthYear(-1); 
    const currentMonthStr = getRelativeMonthYear(0); 
    const nextMonthStr = getRelativeMonthYear(1);  

    const sampleBudgets = [
      { 
        monthYear: prevMonthStr, 
        totalAllocatedBudget: 500000000, 
        note: `Ngân sách tháng ${prevMonthStr} (Mẫu tự động)` 
      },
      { 
        monthYear: currentMonthStr, 
        totalAllocatedBudget: 550000000, 
        note: `Ngân sách tháng ${currentMonthStr} (Mẫu tự động hiện tại)` 
      },
      { 
        monthYear: nextMonthStr, 
        totalAllocatedBudget: 600000000, 
        note: `Ngân sách tháng ${nextMonthStr} (Mẫu tự động tương lai)` 
      }
    ];

    for (const item of sampleBudgets) {
      await CompanyBudgetModel.updateOne(
        { monthYear: item.monthYear },
        { $setOnInsert: item }, 
        { upsert: true }
      );
    }

    console.log('Seed dữ liệu ngân sách thời gian thực hoàn tất!');
  } catch (error) {
    console.error('Lỗi khi seed ngân sách:', error);
  }
};