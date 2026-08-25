import express from 'express';
import performanceController from '../controllers/performance.controller.js';
import { verifyToken, checkRole } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get(
  '/me',
  verifyToken,
  checkRole('EMPLOYEE', 'ADMIN'),
  performanceController.getMyEvaluations
);

router.get(
  '/me/:id',
  verifyToken,
  checkRole('EMPLOYEE', 'ADMIN'),
  performanceController.getMyEvaluationDetail
);

export default router;