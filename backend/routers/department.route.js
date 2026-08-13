import express from 'express';
import departmentController from '../controllers/department.controller.js';
import { verifyToken, checkRole } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', verifyToken, checkRole('ADMIN'), departmentController.postNewDepartment);
router.get('/', verifyToken, checkRole('ADMIN'), departmentController.getAllListDepartment)
router.get('/detailsDepartment/:id', verifyToken, checkRole('ADMIN'), departmentController.getAllDepartmentDetailt)

export default router;