import express from 'express';
import payrollController from '../controllers/payroll.controller.js';
import { verifyToken, checkRole } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get(
  '/me',
  verifyToken,
  checkRole('EMPLOYEE', 'ADMIN'),
  payrollController.getMyPayrolls
);

router.get(
  '/me/:id',
  verifyToken,
  checkRole('EMPLOYEE', 'ADMIN'),
  payrollController.getMyPayrollDetail
);

router.get('/', verifyToken, checkRole('EMPLOYEE', 'ADMIN'),payrollController.getPayrolls);
router.post('/', verifyToken, checkRole('ADMIN'),payrollController.createPayroll);
router.put('/:id', verifyToken, checkRole('ADMIN'),payrollController.updatePayroll);
router.put('/:id/lock', verifyToken, checkRole('ADMIN'), payrollController.toggleLock);
router.put('/lock-month', verifyToken, checkRole('ADMIN'), payrollController.lockMonth);
export default router;