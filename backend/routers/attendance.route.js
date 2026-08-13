import express from 'express';
import attendanceController from '../controllers/attendance.controller.js';
import { verifyToken, checkRole } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get(
  '/me',
  verifyToken,
  checkRole('EMPLOYEE', 'ADMIN'),
  attendanceController.getMyAttendance
);

export default router;