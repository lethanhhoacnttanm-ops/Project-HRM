import express from 'express';
import authRouter from './auth.routes.js';
import employeeRouter from './employee.route.js'
import contractRouter from './contract.route.js'
import departmentRouter from './department.route.js'
import positionRouter from './position.route.js'
import payrollRouter from './payroll.route.js';
import attendanceRouter from './attendance.route.js';
import promotionRouter from './promotion.route.js'
import leaveRequestRouter from './leave.route.js'
import notificationRouter from './notification.route.js'
import supportRouter from './support.route.js'
import benefitRouter from './benefit.route.js'
import performanceRouter from './performance.route.js'

const mainRouter = express.Router();

mainRouter.use('/auth', authRouter);
mainRouter.use('/employees', employeeRouter)
mainRouter.use('/contracts', contractRouter)
mainRouter.use('/departments', departmentRouter)
mainRouter.use('/positions', positionRouter)
mainRouter.use('/payrolls', payrollRouter)
mainRouter.use('/attendances', attendanceRouter)
mainRouter.use('/promotions', promotionRouter)
mainRouter.use('/leaves', leaveRequestRouter)
mainRouter.use('/notifications', notificationRouter)
mainRouter.use('/supports', supportRouter)
mainRouter.use('/benefits', benefitRouter)
mainRouter.use('/performances', performanceRouter)

export default mainRouter;

