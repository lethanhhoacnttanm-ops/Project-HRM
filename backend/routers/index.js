import express from 'express';
import authRouter from './auth.routes.js';
import employeeRouter from './employee.route.js'

const mainRouter = express.Router();

mainRouter.use('/auth', authRouter);
mainRouter.use('/employees', employeeRouter)

export default mainRouter;