import express from 'express';
import employeesController from '../controllers/employee.controller.js';
import { verifyToken, checkRole } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', verifyToken, checkRole('ADMIN'), employeesController.getAllEmployees);

router.put('/:id', verifyToken, checkRole('ADMIN'), employeesController.updateEmployee);

// ===== Employee self-service =====
router.get(
  '/me',
  verifyToken,
  checkRole('EMPLOYEE', 'ADMIN'),
  employeesController.getMyProfile
);

router.put(
  '/me',
  verifyToken,
  checkRole('EMPLOYEE', 'ADMIN'),
  employeesController.updateMyProfile
);

router.put(
  '/me/password',
  verifyToken,
  checkRole('EMPLOYEE', 'ADMIN'),
  employeesController.changePassword
);

export default router;