import express from 'express';
import employeesController from '../controllers/employee.controller.js';
import { verifyToken, checkRole } from '../middleware/auth.middleware.js';
import employeeController from '../controllers/employee.controller.js';
import { validateRegisterRules, handleValidationRegister } from '../middleware/validateRegister.middleware.js';


const router = express.Router();

router.get('/all-list-v1', verifyToken, checkRole('ADMIN'), employeeController.getListAllEmployees)

router.get('/', verifyToken, checkRole('ADMIN'), employeesController.getAllEmployees);

router.post('/register', verifyToken, checkRole('ADMIN'), validateRegisterRules, handleValidationRegister, employeeController.register);

router.put('/assign-department', verifyToken, checkRole('ADMIN'), employeeController.assignEmployeeToDepartment);

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