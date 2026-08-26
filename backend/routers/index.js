import express from 'express';
import authRouter from './auth.routes.js';
import employeeRouter from './employee.route.js'
import contractRouter from './contract.route.js'
import departmentRouter from './department.route.js'
import positionRouter from './position.route.js'
import payrollRouter from './payroll.route.js';
import attendanceRouter from './attendance.route.js';
import promotionRouter from './promotion.route.js'
import jobRouter from './job.routes.js'
import candidateRouter from './candidate-approval.route.js'
import leaveRequestRouter from './leave.route.js'
import notificationRouter from './notification.route.js'
import supportRouter from './support.route.js'
import benefitRouter from './benefit.route.js'
import performanceRouter from './performance.route.js'
import courseRouter from './course.route.js'
import courseprogressRouter from './courseprogress.routes.js'

const mainRouter = express.Router();

mainRouter.use('/auth', authRouter);
mainRouter.use('/employees', employeeRouter)
mainRouter.use('/contracts', contractRouter)
mainRouter.use('/departments', departmentRouter)
mainRouter.use('/positions', positionRouter)
mainRouter.use('/payrolls', payrollRouter)
mainRouter.use('/attendances', attendanceRouter)
mainRouter.use('/promotions', promotionRouter)
mainRouter.use('/jobs', jobRouter)
mainRouter.use('/candidates', candidateRouter)
mainRouter.use('/leave-requests', leaveRequestRouter)
mainRouter.use('/notifications', notificationRouter)
mainRouter.use('/supports', supportRouter)
mainRouter.use('/benefits', benefitRouter)
mainRouter.use('/performances', performanceRouter)
mainRouter.use('/courses', courseRouter)
mainRouter.use('/course-progress', courseprogressRouter)

export default mainRouter;

