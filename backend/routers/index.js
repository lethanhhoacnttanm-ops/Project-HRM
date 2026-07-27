import express from 'express';
import authRouter from './auth.router.js';

const mainRouter = express.Router();

mainRouter.use('/auth', authRouter);

export default mainRouter;