import cron from 'node-cron'
import EmployeeModel from '../models/Employee.js'; 
import AttendanceModel from '../models/Attendance.js';

const initAttendanceCron = () => {
  cron.schedule('59 23 * * *', async () => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const activeEmployees = await EmployeeModel.find({ 
        role: 'EMPLOYEE', 
        status: 'active' 
      });

      for (const emp of activeEmployees) {
        const existingRecord = await AttendanceModel.findOne({
          employee: emp._id,
          date: { $gte: today }
        });

        if (!existingRecord) {
          await AttendanceModel.create({
            employee: emp._id,
            date: new Date(),
            checkIn: null,
            checkOut: null,
            totalHours: '0h 00m',
            status: 'Vắng mặt'
          });
        }
      }

      console.log('[CronJob] Đã quét và ghi nhận trạng thái vắng mặt cho nhân viên thành công.');
    } catch (error) {
      console.error('[CronJob Error] Lỗi khi chạy cron job điểm danh:', error);
    }
  });
};

export default initAttendanceCron