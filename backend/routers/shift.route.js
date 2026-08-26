import express from 'express';
const router = express.Router();
import shiftController from '../controllers/shift.controller.js';
import { verifyToken, checkRole } from '../middleware/auth.middleware.js';

router.post('/', verifyToken, checkRole('ADMIN'), shiftController.create);
router.get('/', verifyToken, checkRole('ADMIN', 'EMPLOYEE'), shiftController.getAllShift);

export default router;