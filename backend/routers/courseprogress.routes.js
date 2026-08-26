import express from 'express';
import courseprogressController from '../controllers/courseprogress.controller.js';
import { verifyToken, checkRole } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', verifyToken, checkRole('ADMIN'), courseprogressController.getAllProgressForAdmin);
router.post('/enroll', verifyToken, checkRole('EMPLOYEE'), courseprogressController.enrollCourse);

export default router;