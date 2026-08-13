import express from 'express';
import authRouter from './auth.routes.js';
import employeeRouter from './employee.route.js'
import contractRouter from './contract.route.js'
import departmentRouter from './department.route.js'
import positionRouter from './position.route.js'
import payrollRouter from './payroll.route.js';

const mainRouter = express.Router();

mainRouter.use('/auth', authRouter);
mainRouter.use('/employees', employeeRouter)
mainRouter.use('/contracts', contractRouter)
mainRouter.use('/departments', departmentRouter)
mainRouter.use('/positions', positionRouter)
mainRouter.use('/payrolls', payrollRouter)

export default mainRouter;

