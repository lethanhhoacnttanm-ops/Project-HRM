import express from 'express';
import courseController from '../controllers/course.controller.js';
import { verifyToken, checkRole } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', verifyToken, checkRole('ADMIN', 'EMPLOYEE'), courseController.getAllCourses);

router.post('/', verifyToken, checkRole('ADMIN'), courseController.createCourse);

export default router;