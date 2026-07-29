import express from 'express';
import employeesController from '../controllers/employee.controller.js'

import { verifyToken, checkRole } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', verifyToken, employeesController.getAllEmployees);

export default router;