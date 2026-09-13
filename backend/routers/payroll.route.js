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
  '/all-no-pagination', 
  verifyToken,  
  checkRole('ADMIN'), 
  payrollController.getAllPayrollsNoPagination
);

router.put(
  '/lock-month', 
  verifyToken, 
  checkRole('ADMIN'), 
  payrollController.lockMonth
);

router.get(
  '/me/:id',
  verifyToken,
  checkRole('EMPLOYEE', 'ADMIN'),
  payrollController.getMyPayrollDetail
);

router.get(
  '/', 
  verifyToken, 
  checkRole('EMPLOYEE', 'ADMIN'),
  payrollController.getPayrolls
);

router.post(
  '/', 
  verifyToken, 
  checkRole('ADMIN'),
  payrollController.createPayroll
);

router.put(
  '/:id/lock', 
  verifyToken, 
  checkRole('ADMIN'), 
  payrollController.toggleLock
);

router.put(
  '/:id', 
  verifyToken, 
  checkRole('ADMIN'),
  payrollController.updatePayroll
);

export default router;