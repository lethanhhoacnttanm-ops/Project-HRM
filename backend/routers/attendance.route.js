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
router.get('/', verifyToken, checkRole('EMPLOYEE', 'ADMIN'), attendanceController.getAllAttendance);
router.get('/today-status', verifyToken, checkRole('EMPLOYEE', 'ADMIN'), attendanceController.getStatus);
router.post('/', verifyToken, checkRole('EMPLOYEE', 'ADMIN'), attendanceController.checkIn);
router.put('/checkout', verifyToken, checkRole('EMPLOYEE', 'ADMIN'), attendanceController.checkOut);

export default router;